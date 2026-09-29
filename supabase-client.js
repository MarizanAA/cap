(() => {
  const config = window.CAP_LAB_SUPABASE_CONFIG || {};
  const ready = Boolean(config.url && config.publishableKey && window.supabase?.createClient);
  window.capLabSupabaseConfigured = Boolean(config.url && config.publishableKey);
  window.capLabSupabase = ready
    ? window.supabase.createClient(config.url, config.publishableKey, {
        auth: { autoRefreshToken: true, persistSession: true, detectSessionInUrl: true }
      })
    : null;
})();
