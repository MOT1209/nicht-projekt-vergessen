import { NextResponse } from 'next/server';

// AI Summary API Route
// Uses Google Gemini API to summarize where the user left off in a project
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { project, tasks, notes, activities } = body;

    if (!project) {
      return NextResponse.json({ error: 'Project data is required' }, { status: 400 });
    }

    // Build context for the AI
    const pendingTasks = tasks?.filter((t: any) => t.status !== 'DONE') || [];
    const doneTasks = tasks?.filter((t: any) => t.status === 'DONE') || [];
    const recentNotes = (notes || []).slice(0, 5);
    const recentActivities = (activities || []).slice(0, 10);

    const prompt = `أنت مساعد ذكي للمبرمجين. قم بتلخيص حالة المشروع البرمجي التالي بشكل موجز ومفيد باللغة العربية.

**اسم المشروع:** ${project.name}
**الوصف:** ${project.description || 'لا يوجد وصف'}
**الحالة:** ${project.status === 'ACTIVE' ? 'نشط' : project.status === 'PAUSED' ? 'متوقف مؤقتاً' : 'مكتمل'}
**آخر نشاط:** ${project.last_activity}

**المهام المتبقية (${pendingTasks.length}):**
${pendingTasks.slice(0, 10).map((t: any) => `- [${t.status}] ${t.title}: ${t.description || ''}`).join('\n') || 'لا توجد مهام متبقية'}

**المهام المنجزة (${doneTasks.length}):**
${doneTasks.slice(0, 5).map((t: any) => `- ✅ ${t.title}`).join('\n') || 'لا توجد مهام منجزة'}

**آخر الملاحظات:**
${recentNotes.map((n: any) => `- ${n.content.substring(0, 100)}`).join('\n') || 'لا توجد ملاحظات'}

قدّم ملخصاً قصيراً (4-6 جمل) يجيب على:
1. أين توقفت في هذا المشروع؟
2. ما هي أهم المهام التالية؟
3. ما هي التوصية للمتابعة؟

اجعل الرد مباشراً وعملياً.`;

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      // Fallback: Generate a rule-based summary without AI
      const fallbackSummary = generateFallbackSummary(project, pendingTasks, doneTasks, recentNotes);
      return NextResponse.json({ summary: fallbackSummary, source: 'fallback' });
    }

    // Call Google Gemini API
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
          },
        }),
      }
    );

    if (!response.ok) {
      const fallbackSummary = generateFallbackSummary(project, pendingTasks, doneTasks, recentNotes);
      return NextResponse.json({ summary: fallbackSummary, source: 'fallback' });
    }

    const data = await response.json();
    const summary = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return NextResponse.json({ summary, source: 'gemini' });
  } catch (error: any) {
    console.error('AI Summary Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

function generateFallbackSummary(project: any, pendingTasks: any[], doneTasks: any[], notes: any[]): string {
  const completionRate = doneTasks.length > 0
    ? Math.round((doneTasks.length / (doneTasks.length + pendingTasks.length)) * 100)
    : 0;

  const highPriorityTasks = pendingTasks.filter((t: any) => t.priority === 'HIGH');
  const inProgressTasks = pendingTasks.filter((t: any) => t.status === 'IN_PROGRESS');

  let summary = `مشروع **${project.name}** في حالة ${project.status === 'ACTIVE' ? 'نشطة' : 'متوقفة مؤقتاً'}. `;

  if (completionRate > 0) {
    summary += `أنجزت ${completionRate}% من المهام (${doneTasks.length} من ${doneTasks.length + pendingTasks.length}). `;
  }

  if (inProgressTasks.length > 0) {
    summary += `لديك ${inProgressTasks.length} مهمة قيد التنفيذ حالياً: "${inProgressTasks[0].title}". `;
  }

  if (highPriorityTasks.length > 0) {
    summary += `⚠️ تنبيه: لديك ${highPriorityTasks.length} مهمة ذات أولوية عالية تحتاج اهتماماً. `;
  }

  if (pendingTasks.length > 0) {
    summary += `\n\n**المهمة التالية المقترحة:** ${pendingTasks[0].title}`;
    if (pendingTasks[0].description) {
      summary += ` — ${pendingTasks[0].description}`;
    }
  } else {
    summary += `\n\n🎉 تهانينا! لا توجد مهام متبقية في هذا المشروع.`;
  }

  return summary;
}
