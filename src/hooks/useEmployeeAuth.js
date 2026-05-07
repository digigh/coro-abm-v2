// ─────────────────────────────────────────────
// useEmployeeAuth.js — Supabase User Auth Hook
// ─────────────────────────────────────────────

import { useState } from 'react';
import { supabase } from '../supabaseClient';
import { sanitizeInput } from '../utils/uploadUtils';

const useEmployeeAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState('');

  const clearError = () => setError('');

  /**
   * Looks up an employee by ID in Supabase.
   * Returns { found: bool, data: object|null }
   */
  const checkEmployee = async (rawEmployeeId) => {
    const employeeId = sanitizeInput(rawEmployeeId).toUpperCase();

    if (!employeeId) {
      setError('Employee ID is required.');
      return { found: false, data: null };
    }

    setLoading(true);
    setError('');

    try {
      // Use ilike for case-insensitive matching just in case
      const { data, error: sbErr } = await supabase
        .from('users')
        .select('employee_id, name, division, business_unit')
        .ilike('employee_id', employeeId)
        .maybeSingle();

      if (sbErr) throw sbErr;

      if (data) {
        console.info('[useEmployeeAuth] Employee found:', data.employee_id);
        return { found: true, data };
      }
      
      console.info('[useEmployeeAuth] Employee not found:', employeeId);
      return { found: false, data: null };
    } catch (err) {
      console.error('[useEmployeeAuth] checkEmployee:', err);
      setError('Could not verify Employee ID. Please check your connection and try again.');
      return { found: false, data: null };
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registers a new user in Supabase.
   * Returns { success: bool }
   */
  const registerEmployee = async (rawEmployeeId, rawUserData) => {
    const employeeId    = sanitizeInput(rawEmployeeId).toUpperCase();
    const name          = sanitizeInput(rawUserData.name);
    const division      = sanitizeInput(rawUserData.division);
    const business_unit = sanitizeInput(rawUserData.business_unit);

    if (!name || !division || !business_unit) {
      setError('All fields are required.');
      return { success: false };
    }

    setLoading(true);
    setError('');

    try {
      // Upsert — safe even if a race condition created the row already
      const { error: sbErr } = await supabase
        .from('users')
        .upsert(
          { employee_id: employeeId, name, division, business_unit },
          { onConflict: 'employee_id', ignoreDuplicates: false }
        );

      if (sbErr) throw sbErr;
      return { success: true };
    } catch (err) {
      console.error('[useEmployeeAuth] registerEmployee:', err);
      setError('Registration failed. Please try again.');
      return { success: false };
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, clearError, checkEmployee, registerEmployee };
};

export default useEmployeeAuth;
