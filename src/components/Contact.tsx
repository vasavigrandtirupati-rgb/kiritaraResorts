import React, { useState } from 'react';
import { Phone, Mail, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';

interface ContactProps {
  content?: {
    title?: string;
    subtitle?: string;
    description?: string;
    phone?: string;
    email?: string;
    address?: string;
  };
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  investmentAmount: string;
  timeline: string;
  message: string;
}

export const Contact: React.FC<ContactProps> = ({ content }) => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    investmentAmount: '',
    timeline: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = (): boolean => {
    const required = ['fullName', 'email', 'phone', 'investmentAmount', 'timeline'];
    return required.every(field => formData[field as keyof FormData].trim() !== '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // Save to Supabase
      const { error } = await supabase
        .from('contact_submissions')
        .insert({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
          investment_interest: `${formData.investmentAmount} - ${formData.timeline}`,
          status: 'new'
        });

      if (error) throw error;
      
      setIsSubmitted(true);
      toast({
        title: "Thank you for your interest!",
        description: "Our investment team will contact you within 24 hours.",
      });
      
      // Reset form
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        investmentAmount: '',
        timeline: '',
        message: ''
      });
      
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: "Submission Error",
        description: "Please try again or contact us directly.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-background via-muted/30 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 mb-6 bg-primary/10 rounded-full border border-primary/20">
            <Send className="w-4 h-4 mr-2 text-primary" />
            <span className="text-sm font-medium text-primary">Get Started</span>
          </div>
          
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-foreground">
            {content?.title || 'Get In Touch'}
          </h2>
          
          <p className="text-xl text-muted-foreground mb-4 max-w-3xl mx-auto">
            {content?.subtitle || 'Ready to explore exclusive investment opportunities?'}
          </p>
          
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            {content?.description || 'Our team is here to guide you through premium resort investments.'}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div className="lg:col-span-1 space-y-6">
            {/* Contact Cards */}
            <Card className="luxury-shadow hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="w-5 h-5 mr-3 text-primary" />
                  Phone
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Speak with our specialists</p>
                <a 
                  href={`tel:${content?.phone || '+1 (555) 123-4567'}`}
                  className="text-lg font-semibold text-primary hover:underline"
                >
                  {content?.phone || '+1 (555) 123-4567'}
                </a>
              </CardContent>
            </Card>

            <Card className="luxury-shadow hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Mail className="w-5 h-5 mr-3 text-primary" />
                  Email
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Investment inquiries</p>
                <a 
                  href={`mailto:${content?.email || 'invest@kiritara.com'}`}
                  className="text-lg font-semibold text-primary hover:underline break-all"
                >
                  {content?.email || 'invest@kiritara.com'}
                </a>
              </CardContent>
            </Card>

            <Card className="luxury-shadow hover-lift">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="w-5 h-5 mr-3 text-primary" />
                  Office
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-2">Visit our headquarters</p>
                <p className="text-lg font-semibold">{content?.address || '123 Resort Boulevard, Paradise City, PC 12345'}</p>
              </CardContent>
            </Card>

            {/* Success Message */}
            {isSubmitted && (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-6">
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-5 h-5 mr-2" />
                    <span className="font-semibold">Message Sent Successfully!</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    We'll be in touch within 24 hours.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="luxury-shadow">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Send className="w-5 h-5 mr-3 text-primary" />
                  Investment Inquiry Form
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Full Name */}
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                        placeholder="Enter your full name"
                        className="transition-all duration-300 focus:ring-primary/50"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="transition-all duration-300 focus:ring-primary/50"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="Enter your phone number"
                        className="transition-all duration-300 focus:ring-primary/50"
                        required
                      />
                    </div>

                    {/* Investment Amount */}
                    <div className="space-y-2">
                      <Label htmlFor="investmentAmount">Investment Budget *</Label>
                      <Select value={formData.investmentAmount} onValueChange={(value) => handleInputChange('investmentAmount', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select investment range" />
                        </SelectTrigger>
                        <SelectContent>
                          {['$100K - $500K', '$500K - $1M', '$1M - $5M', '$5M+'].map((option) => (
                            <SelectItem key={option} value={option}>{option}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="space-y-2">
                    <Label htmlFor="timeline">Investment Timeline *</Label>
                    <Select value={formData.timeline} onValueChange={(value) => handleInputChange('timeline', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your timeline" />
                      </SelectTrigger>
                      <SelectContent>
                        {['Immediate (0-3 months)', 'Short-term (3-12 months)', 'Medium-term (1-3 years)', 'Long-term (3+ years)'].map((option) => (
                          <SelectItem key={option} value={option}>{option}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Additional Information</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange('message', e.target.value)}
                      placeholder="Tell us more about your investment goals..."
                      rows={4}
                      className="transition-all duration-300 focus:ring-primary/50"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting || !validateForm()}
                    className="btn-luxury w-full text-lg py-6"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Sending Message...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Investment Inquiry
                      </>
                    )}
                  </Button>
                </form>

                {/* Disclaimer */}
                <div className="mt-6 p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start">
                    <AlertCircle className="w-4 h-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
                    <p className="text-sm text-muted-foreground">
                      By submitting this form, you acknowledge that investment opportunities involve risk and past performance does not guarantee future results. Our team will provide detailed information during consultation.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};