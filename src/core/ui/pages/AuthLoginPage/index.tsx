import React from 'react';
import { observer } from 'mobx-react';

// components

import { AuthCheckEmailForm } from '@core/ui/cerebro/forms/AuthCheckEmailForm';
import { AuthLoginForm } from '@core/ui/cerebro/forms/AuthLoginForm';
import { AuthPageLayout } from '@core/ui/templates/AuthPageLayout';
import { AuthRestorePasswordForm } from '@core/ui/cerebro/forms/AuthRestorePasswordForm';

export type AuthLoginForms = 'login' | 'restore' | 'email';

export const AuthLoginPage = observer(() => {
  const [form, setForm] = React.useState<AuthLoginForms>('login');
  return (
    <AuthPageLayout>
      {form === 'login' && <AuthLoginForm onForgotPassword={() => setForm('restore')} />}
      {form === 'restore' && (
        <AuthRestorePasswordForm onConfirm={() => setForm('email')} onBackToSignIn={() => setForm('login')} />
      )}
      {form === 'email' && <AuthCheckEmailForm onBackToSignIn={() => setForm('login')} />}
    </AuthPageLayout>
  );
});
