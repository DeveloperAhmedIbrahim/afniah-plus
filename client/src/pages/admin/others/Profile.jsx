import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/admin/ui/card";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { handleFormSubmission } from "@/lib/axios";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { clearFormErrors } from "@/lib/utils";

const Profile = () => {
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(
          `/admin/others/profile`
        );
        setProfile(response.data.profile);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load profile section data");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchProfile();
  },[]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleFormSubmission(e, `/admin/others/profile`, "POST");
    } catch (error) {
      toast.error("Failed to update profile section");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          {"Loading profile data"}
        </span>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          {"Profile section data not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
        <span className="text-green-primary">
          Admin Profile
        </span>
      </h1>

      <Card>
        <CardHeader className="pb-2">
          
        </CardHeader>

        <CardContent>
          <form className="space-y-8" onSubmit={onSubmit}>

            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                {/* Full Name */}
                <div>
                    <Label htmlFor="tagline">Full Name</Label>
                    <Input
                        id="name"
                        name="name"
                        defaultValue={profile?.name || ""}
                        placeholder="Enter name here..."
                    />
                    <span className="text-rose-500 field-error text-sm error-name">&nbsp;</span>
                </div>

                {/* Email Address */}
                <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                        id="email"
                        name="email"
                        defaultValue={profile?.email || ""}
                        placeholder="Enter email here..."
                    />
                    <span className="text-rose-500 field-error text-sm error-email">&nbsp;</span>
                </div>


                {/* Password */}
                <div>
                    <Label htmlFor="tagline">Password</Label>
                    <Input
                        id="password"
                        name="password"
                        placeholder="Enter password here..."
                    />
                    <span className="text-blue-500 field-error text-sm error-password">
                        Please leave password field empty if you don't want to update password.
                    </span>
                </div>
            </div>


            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin ml-2" /> Saving
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;