import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "@/components/admin/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/admin/ui/tabs";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/admin/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Label } from "@/components/admin/ui/label";
import { Input } from "@/components/admin/ui/input";
import { handleFormSubmission } from "@/lib/axios";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { clearFormErrors } from "@/lib/utils";

const SocialDetails = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const lang = searchParams.get("lang") || "en";
  const isArabic = lang === "ar";
  const dir = isArabic ? "rtl" : "ltr";

  const [socialDetails, setSocialDetails] = useState(null);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Fetch others socialDetails data
  useEffect(() => {
    const fetchSocialDetails = async () => {
      setFetchLoading(true);
      clearFormErrors();
      try {
        const response = await axiosInstance.get(
          `/admin/others/social-details?lang=${lang}`
        );
        setSocialDetails(response.data.socialDetails);
      } catch (error) {
        console.error("Fetch Error:", error);
        toast.error("Failed to load social-details section data");
      } finally {
        setFetchLoading(false);
      }
    };

    fetchSocialDetails();
  }, [lang]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await handleFormSubmission(e, `/admin/others/social-details`, "POST");
    } catch (error) {
      toast.error("Failed to update social-details section");
    } finally {
      setLoading(false);
    }
  };

  if (fetchLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
        <span className="ml-3 text-gray-600">
          {"Loading social details data"}
        </span>
      </div>
    );
  }

  if (!socialDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-red-600 text-lg font-medium">
          {"Social Details section data not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <h1 className={`text-2xl text-gray-700 flex items-center gap-2`}>
        <span className="text-green-primary">
          {"Address & Social Details"}
        </span>
        <span className="text-gray-500 text-xl">({lang.toUpperCase()})</span>
      </h1>

      {/* Language Tabs */}
      <div className="flex justify-center">
        <Tabs value={lang} className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger
              value="en"
              onClick={() => navigate(`/admin/social?lang=en`)}
            >
              English
            </TabsTrigger>
            <TabsTrigger
              value="ar"
              onClick={() => navigate(`/admin/social?lang=ar`)}
            >
              العربية
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card>
        <CardHeader className="pb-2">
          {/* Optional: small note or description can be added here */}
        </CardHeader>

        <CardContent dir={dir}>
          <form className="space-y-8" onSubmit={onSubmit}>
            <input type="hidden" name="lang" value={lang} />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Tagline */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="tagline">
                  {isArabic ? "الشعار الرئيسي" : "Tagline"}
                </Label>
                <Input
                  id="tagline"
                  name="tagline"
                  defaultValue={socialDetails?.tagline || ""}
                  placeholder={
                    isArabic
                      ? "اكتب الشعار الرئيسي هنا..."
                      : "Please add tagline here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-tagline">
                  &nbsp;
                </span>
              </div>

              {/* Copyright Credits */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="copyrightCredits">
                  {isArabic ? "حقوق النشر والائتمانات" : "Copyright Credits"}
                </Label>
                <Input
                  id="copyrightCredits"
                  name="copyrightCredits"
                  defaultValue={socialDetails?.copyright_credits || ""}
                  placeholder={
                    isArabic
                      ? "اكتب حقوق النشر والائتمانات هنا..."
                      : "Please add copyright credits here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-copyrightCredits">
                  &nbsp;
                </span>
              </div>
            </div>

            {/* Main Fields */}
            <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
              {/* Address */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="address">
                  {isArabic ? "العنوان" : "Address"}
                </Label>
                <Input
                  id="address"
                  name="address"
                  defaultValue={socialDetails?.address || ""}
                  placeholder={
                    isArabic
                      ? "اكتب العنوان الكامل هنا..."
                      : "Please add address here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-address">
                  &nbsp;
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Address */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="email">
                  {isArabic ? "البريد الإلكتروني" : "Email Address"}
                </Label>
                <Input
                  id="email"
                  name="email"
                  defaultValue={socialDetails?.email || ""}
                  placeholder={
                    isArabic
                      ? "اكتب البريد الإلكتروني هنا..."
                      : "Please add email here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-email">
                  &nbsp;
                </span>
              </div>

              {/* Contact Number */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="contact">
                  {isArabic ? "رقم التواصل" : "Contact Number"}
                </Label>
                <Input
                  id="contact"
                  name="contact"
                  defaultValue={socialDetails?.contact || ""}
                  placeholder={
                    isArabic
                      ? "اكتب رقم التواصل هنا..."
                      : "Please add contact here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-contact">
                  &nbsp;
                </span>
              </div>
            </div>

            <h3>{isArabic ? "روابط التواصل الاجتماعي" : "Social Links"}</h3>
            <hr />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Facebook Link */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="facebook">
                  {isArabic ? "رابط فيسبوك" : "Facebook Link"}
                </Label>
                <Input
                  id="facebook"
                  name="facebook"
                  defaultValue={socialDetails?.facebook || ""}
                  placeholder={
                    isArabic
                      ? "اكتب رابط فيسبوك هنا..."
                      : "Please add facebook link here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-facebook">
                  &nbsp;
                </span>
              </div>

              {/* Instagram Link */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="instagram">
                  {isArabic ? "رابط إنستغرام" : "Instagram Link"}
                </Label>
                <Input
                  id="instagram"
                  name="instagram"
                  defaultValue={socialDetails?.instagram || ""}
                  placeholder={
                    isArabic
                      ? "اكتب رابط إنستغرام هنا..."
                      : "Please add instagram link here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-instagram">
                  &nbsp;
                </span>
              </div>

              {/* Twitter Link */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="twitter">
                  {isArabic ? "رابط تويتر" : "Twitter Link"}
                </Label>
                <Input
                  id="twitter"
                  name="twitter"
                  defaultValue={socialDetails?.twitter || ""}
                  placeholder={
                    isArabic
                      ? "اكتب رابط تويتر هنا..."
                      : "Please add twitter link here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-twitter">
                  &nbsp;
                </span>
              </div>

              {/* Linkedin Link */}
              <div className={isArabic ? "text-right" : "text-left"}>
                <Label htmlFor="linkedin">
                  {isArabic ? "رابط لينكدإن" : "Linkedin Link"}
                </Label>
                <Input
                  id="linkedin"
                  name="linkedin"
                  defaultValue={socialDetails?.linkedin || ""}
                  placeholder={
                    isArabic
                      ? "اكتب رابط لينكدإن هنا..."
                      : "Please add linkedin link here"
                  }
                  className={isArabic ? "text-right" : "text-left"}
                  dir={dir}
                />
                <span className="text-rose-500 field-error text-sm error-linkedin">
                  &nbsp;
                </span>
              </div>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin ml-2" />
                  {isArabic ? "جاري الحفظ..." : "Saving..."}
                </>
              ) : isArabic ? (
                "حفظ التغييرات"
              ) : (
                "Save Changes"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* RTL Toolbar fix (if needed in future) */}
      <style jsx global>{`
        .jodit-wysiwyg[dir="rtl"] ~ .jodit-toolbar,
        .jodit-container[dir="rtl"] .jodit-toolbar {
          direction: ltr !important;
          text-align: left !important;
        }
      `}</style>
    </div>
  );
};

export default SocialDetails;