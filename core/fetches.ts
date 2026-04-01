// core/fetch/actions.ts
"use server"

import { createClient } from '@/lib/supabase/server';
import { getCurrentDemoUser } from '@/core/auth-action';

export async function getStudentDashboardData() {
    const user = await getCurrentDemoUser();
    if (!user) return { error: "Not authenticated", data: null };

    const supabase = await createClient();

    // Fetch multiple things at once for better performance
    const [homework, schedule, profile] = await Promise.all([
        supabase
            .from('homework')
            .select('*')
            .eq('user_id', user.user_id)
            .order('due_date', { ascending: true }),
        supabase
            .from('schedules')
            .select('*')
            .eq('user_id', user.user_id),
        supabase
            .from('user_profiles')
            .select('*')
            .eq('user_id', user.user_id)
            .maybeSingle()
    ]);

    return {
        homework: homework.data || [],
        schedule: schedule.data || [],
        profile: profile.data || null,
        user: user
    };
}