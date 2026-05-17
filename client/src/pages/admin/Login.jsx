import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Label } from '@/components/admin/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/admin/ui/card';
import { AlertCircle, Loader2 } from 'lucide-react';
import { handleFormSubmission } from '@/lib/axios';

const Login = () => {
  const [loading, setLoading] = useState(false);

  const loginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await handleFormSubmission(e, '/admin/login');
    }
    finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-green-100 p-4" style={{ backgroundImage: 'url(/assets/others/07.png)', backgroundSize: 'cover' }}>
      <Card className="w-full max-w-md py-10 bg-white/90 backdrop-blur-sm shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex justify-center mb-10">
            <img src="/assets/logo/logo.png" alt="Logo" width={150} />
          </div>
          <CardTitle className="text-2xl text-center">Admin Login</CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access the admin panel
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={loginSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="text"
                name="email"
                placeholder="admin@afniah.com"
              />
              <span class="text-rose-500 field-error error-email">&nbsp;</span>              
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="••••••••"
              />
              <span class="text-rose-500 field-error error-password">&nbsp;</span>
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Logging in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;