import { DashboardLayout } from './DashboardLayout';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { BookOpen, Video, FileText, Download, ExternalLink, HelpCircle, Users, Heart } from 'lucide-react';

export function GuardianResources() {
  const resources = [
    {
      category: 'Educational Guides',
      icon: BookOpen,
      color: 'bg-sky-100 text-sky-600',
      items: [
        { title: 'Understanding ASD: A Parent\'s Guide', type: 'PDF', size: '2.4 MB' },
        { title: 'VR Therapy Benefits and Best Practices', type: 'PDF', size: '1.8 MB' },
        { title: 'Supporting Your Child at Home', type: 'PDF', size: '3.1 MB' },
        { title: 'Sensory Processing Guide', type: 'PDF', size: '2.0 MB' }
      ]
    },
    {
      category: 'Video Tutorials',
      icon: Video,
      color: 'bg-purple-100 text-purple-600',
      items: [
        { title: 'How to Prepare Your Child for VR Sessions', type: 'Video', duration: '8 min' },
        { title: 'Understanding Session Reports', type: 'Video', duration: '6 min' },
        { title: 'Home Practice Activities', type: 'Video', duration: '12 min' },
        { title: 'Managing Sensory Overload', type: 'Video', duration: '10 min' }
      ]
    },
    {
      category: 'Activity Worksheets',
      icon: FileText,
      color: 'bg-emerald-100 text-emerald-600',
      items: [
        { title: 'Social Skills Practice Activities', type: 'PDF', size: '1.5 MB' },
        { title: 'Communication Exercises', type: 'PDF', size: '1.2 MB' },
        { title: 'Emotion Recognition Flashcards', type: 'PDF', size: '4.5 MB' },
        { title: 'Daily Routine Visual Schedule', type: 'PDF', size: '800 KB' }
      ]
    }
  ];

  const communityLinks = [
    { title: 'Parent Support Group', description: 'Connect with other parents', icon: Users },
    { title: 'FAQ & Help Center', description: 'Common questions answered', icon: HelpCircle },
    { title: 'Therapist Contact', description: 'Reach out to your therapist', icon: Heart }
  ];

  return (
    <DashboardLayout>
      <div className="p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 text-slate-900">Resources & Support</h1>
          <p className="text-slate-600">Educational materials and helpful resources for your journey</p>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {communityLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Card key={link.title} className="p-6 hover:shadow-lg transition-all cursor-pointer border-2 border-transparent hover:border-amber-200">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Icon className="w-6 h-6 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-1">{link.title}</h3>
                    <p className="text-sm text-slate-600">{link.description}</p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Resources by Category */}
        <div className="space-y-8">
          {resources.map((section) => {
            const Icon = section.icon;
            return (
              <Card key={section.category} className="p-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-10 h-10 ${section.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-xl font-semibold text-slate-900">{section.category}</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  {section.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                    >
                      <div className="flex items-start gap-3 flex-1">
                        <FileText className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="font-medium text-slate-900 text-sm">{item.title}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            {item.type} • {'size' in item ? item.size : item.duration}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-amber-600 hover:text-amber-700 hover:bg-amber-50"
                      >
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}
        </div>

        {/* External Resources */}
        <Card className="p-8 mt-8 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200">
          <h2 className="text-xl font-semibold text-slate-900 mb-6">Helpful External Resources</h2>
          <div className="space-y-3">
            {[
              { title: 'Autism Speaks - Parent Resources', url: 'https://www.autismspeaks.org' },
              { title: 'CDC - Autism Spectrum Disorder', url: 'https://www.cdc.gov/ncbddd/autism' },
              { title: 'ASAN - Autistic Self Advocacy Network', url: 'https://autisticadvocacy.org' },
              { title: 'National Autism Association', url: 'https://nationalautismassociation.org' }
            ].map((link) => (
              <a
                key={link.title}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white rounded-lg hover:shadow-md transition-all group"
              >
                <span className="font-medium text-slate-900 group-hover:text-amber-600 transition-colors">
                  {link.title}
                </span>
                <ExternalLink className="w-5 h-5 text-slate-400 group-hover:text-amber-600 transition-colors" />
              </a>
            ))}
          </div>
        </Card>

        {/* Contact Support */}
        <Card className="p-6 mt-8 bg-slate-50">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-900 mb-1">Need Additional Support?</h3>
              <p className="text-sm text-slate-600">Our team is here to help answer any questions</p>
            </div>
            <Button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600">
              Contact Support
            </Button>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
