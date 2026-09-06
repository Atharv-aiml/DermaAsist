import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { HelpCircle, Mail, Wrench, Send } from 'lucide-react';

export default function SupportPage() {
  const { t } = useTranslation();

  const faqs = [
    { q: t('support.faq.q1') || 'How accurate is the AI assessment?', a: t('support.faq.a1') || 'The AI is designed to assist and provide information, but it is not a substitute for a professional medical diagnosis.' },
    { q: t('support.faq.q2') || 'Is my data secure?', a: t('support.faq.a2') || 'Yes, we take privacy seriously. All images are processed securely and not shared with third parties without consent.' },
    { q: t('support.faq.q3') || 'How do I take a good photo?', a: t('support.faq.a3') || 'Ensure good lighting, focus on the affected area, and keep the camera steady at about 10-15 cm distance.' },
    { q: t('support.faq.q4') || 'Can I use this for children?', a: t('support.faq.a4') || 'Yes, you can create profiles for family members including children under the Family section.' }
  ];

  return (
    <div className="container max-w-4xl mx-auto py-8 px-4 space-y-8">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-slate-900 mb-3">{t('support.title') || 'Help & Support'}</h1>
        <p className="text-slate-500 max-w-lg mx-auto">{t('support.subtitle') || 'Find answers to common questions or reach out to our team for assistance.'}</p>
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-8 bg-slate-100 p-1">
          <TabsTrigger value="faq" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5">
            <HelpCircle className="w-4 h-4 mr-2" /> FAQ
          </TabsTrigger>
          <TabsTrigger value="contact" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5">
            <Mail className="w-4 h-4 mr-2" /> Contact Us
          </TabsTrigger>
          <TabsTrigger value="troubleshoot" className="data-[state=active]:bg-white data-[state=active]:shadow-sm py-2.5">
            <Wrench className="w-4 h-4 mr-2" /> Troubleshooting
          </TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="space-y-4">
          <div className="grid gap-4">
            {faqs.map((faq, i) => (
              <Card key={i} className="border-slate-200 shadow-sm">
                <CardHeader className="py-4">
                  <CardTitle className="text-lg text-slate-800">{faq.q}</CardTitle>
                </CardHeader>
                <CardContent className="text-slate-600 pb-5">
                  {faq.a}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="contact">
          <Card className="max-w-2xl mx-auto">
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>Our support team will get back to you within 24 hours.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Your Email</Label>
                <Input type="email" placeholder="you@example.com" />
              </div>
              <div className="space-y-2">
                <Label>Subject</Label>
                <Input placeholder="How can we help?" />
              </div>
              <div className="space-y-2">
                <Label>Message</Label>
                <Textarea rows={5} placeholder="Describe your issue or question..." />
              </div>
              <Button className="w-full bg-teal-600 hover:bg-teal-700 mt-4">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="troubleshoot">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Camera Not Working?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>1. Check if you granted camera permissions to the browser.</p>
                <p>2. Try refreshing the page.</p>
                <p>3. If using an external camera, ensure it's properly connected.</p>
                <p>4. Try using the "Upload from Gallery" option instead.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Analysis Taking Too Long?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-slate-600">
                <p>1. Ensure you have a stable internet connection.</p>
                <p>2. Large images might take longer to upload and process.</p>
                <p>3. If it's stuck for more than 1 minute, refresh and try again.</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
