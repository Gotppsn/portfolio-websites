import React, { useState } from 'react';
import { MailIcon, PhoneIcon, LocationMarkerIcon, LinkIcon } from '@heroicons/react/outline';

// Sample profile data - replace with your actual data
const profileData = {
  name: 'John Doe',
  title: 'Full Stack Developer',
  email: 'john.doe@example.com',
  phone: '+1 (555) 123-4567',
  location: 'New York, NY',
  website: 'https://johndoe.dev',
  summary: 'Experienced Full Stack Developer with a passion for creating efficient, scalable, and maintainable applications. Proficient in JavaScript, TypeScript, React, Node.js, and .NET Core. Committed to writing clean code and applying best practices to deliver high-quality solutions.',
  skills: [
    { name: 'JavaScript', rating: 90 },
    { name: 'TypeScript', rating: 85 },
    { name: 'React', rating: 90 },
    { name: 'Node.js', rating: 80 },
    { name: 'CSS/SCSS', rating: 85 },
    { name: '.NET Core', rating: 75 },
    { name: 'C#', rating: 75 },
    { name: 'SQL', rating: 70 },
    { name: 'MongoDB', rating: 65 },
  ],
  experience: [
    {
      id: 1,
      title: 'Senior Full Stack Developer',
      company: 'TechCorp Inc.',
      location: 'New York, NY',
      startDate: 'Jan 2021',
      endDate: 'Present',
      description: 'Lead developer for multiple projects including e-commerce platforms and enterprise applications. Responsible for architecture decisions, code reviews, and mentoring junior developers.',
      technologies: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'AWS'],
    },
    {
      id: 2,
      title: 'Full Stack Developer',
      company: 'WebSolutions LLC',
      location: 'Boston, MA',
      startDate: 'Mar 2018',
      endDate: 'Dec 2020',
      description: 'Developed and maintained various web applications. Collaborated with design and product teams to implement new features and improve existing functionalities.',
      technologies: ['JavaScript', 'React', 'Express', 'MySQL', 'Docker'],
    },
    {
      id: 3,
      title: 'Front-end Developer',
      company: 'Creative Digital',
      location: 'Chicago, IL',
      startDate: 'Jun 2016',
      endDate: 'Feb 2018',
      description: 'Created responsive and user-friendly interfaces for client websites. Worked with designers to implement pixel-perfect designs and ensure optimal performance.',
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'jQuery', 'Bootstrap'],
    },
  ],
  education: [
    {
      id: 1,
      degree: 'Master of Science in Computer Science',
      institution: 'Massachusetts Institute of Technology',
      location: 'Cambridge, MA',
      startDate: '2014',
      endDate: '2016',
      description: 'Focused on software engineering and distributed systems.',
    },
    {
      id: 2,
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2010',
      endDate: '2014',
      description: 'Graduated with honors. Participated in various hackathons and coding competitions.',
    },
  ],
  certifications: [
    {
      id: 1,
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Jan 2022',
      expires: 'Jan 2025',
    },
    {
      id: 2,
      name: 'Microsoft Certified: Azure Developer Associate',
      issuer: 'Microsoft',
      date: 'Mar 2021',
      expires: 'Mar 2024',
    },
    {
      id: 3,
      name: 'MongoDB Certified Developer Associate',
      issuer: 'MongoDB',
      date: 'Sep 2020',
      expires: 'Sep 2023',
    },
  ],
};

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('skills');
  
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
          <div className="p-6 sm:p-8">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img
                    className="h-24 w-24 rounded-full"
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                  />
                </div>
                <div className="mt-4 sm:mt-0 text-center sm:text-left">
                  <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {profileData.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {profileData.title}
                  </p>
                </div>
              </div>
              <div className="mt-5 sm:mt-0 flex justify-center">
                <button
                  type="button"
                  className="btn btn-primary"
                >
                  Edit Profile
                </button>
                <button
                  type="button"
                  className="ml-3 btn btn-outline"
                >
                  Download CV
                </button>
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="flex items-center">
                <MailIcon 
                  className="h-5 w-5 text-gray-400" 
                  aria-hidden="true" 
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {profileData.email}
                </span>
              </div>
              <div className="flex items-center">
                <PhoneIcon 
                  className="h-5 w-5 text-gray-400" 
                  aria-hidden="true" 
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {profileData.phone}
                </span>
              </div>
              <div className="flex items-center">
                <LocationMarkerIcon 
                  className="h-5 w-5 text-gray-400" 
                  aria-hidden="true" 
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                  {profileData.location}
                </span>
              </div>
              <div className="flex items-center">
                <LinkIcon 
                  className="h-5 w-5 text-gray-400" 
                  aria-hidden="true" 
                />
                <a
                  href={profileData.website}
                  className="ml-2 text-sm text-primary-600 dark:text-primary-400 hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {profileData.website.replace('https://', '')}
                </a>
              </div>
            </div>
            
            {/* Summary */}
            <div className="mt-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                Summary
              </h2>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                {profileData.summary}
              </p>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="mt-6">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="-mb-px flex space-x-8">
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'skills'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'experience'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'education'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button
                className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'certifications'
                    ? 'border-primary-500 text-primary-600 dark:text-primary-400'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 dark:text-gray-400 dark:hover:text-gray-300'
                }`}
                onClick={() => setActiveTab('certifications')}
              >
                Certifications
              </button>
            </nav>
          </div>
          
          {/* Tab Content */}
          <div className="py-6">
            {/* Skills Tab */}
            {activeTab === 'skills' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Technical Skills
                </h2>
                <div className="space-y-6">
                  {profileData.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                          {skill.name}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {skill.rating}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                        <div
                          className="bg-primary-600 dark:bg-primary-500 h-2.5 rounded-full"
                          style={{ width: `${skill.rating}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Experience Tab */}
            {activeTab === 'experience' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Work Experience
                </h2>
                <div className="space-y-8">
                  {profileData.experience.map((job) => (
                    <div key={job.id} className="relative">
                      <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 rounded-full bg-primary-600 dark:bg-primary-500"></div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {job.title}
                          </h3>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {job.company}, {job.location}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {job.startDate} - {job.endDate}
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {job.description}
                          </p>
                          <div className="mt-3 flex flex-wrap gap-2">
                            {job.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 dark:bg-primary-900 dark:text-primary-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education Tab */}
            {activeTab === 'education' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Education
                </h2>
                <div className="space-y-8">
                  {profileData.education.map((edu) => (
                    <div key={edu.id} className="relative">
                      <div className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-gray-700">
                        <div className="absolute left-[-8px] top-2 w-4 h-4 rounded-full bg-secondary-600 dark:bg-secondary-500"></div>
                        <div>
                          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                            {edu.degree}
                          </h3>
                          <div className="text-sm text-gray-600 dark:text-gray-300">
                            {edu.institution}, {edu.location}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            {edu.startDate} - {edu.endDate}
                          </div>
                          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            {edu.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Certifications Tab */}
            {activeTab === 'certifications' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Certifications
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profileData.certifications.map((cert) => (
                    <div
                      key={cert.id}
                      className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden"
                    >
                      <div className="p-5">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                          {cert.name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {cert.issuer}
                        </p>
                        <div className="mt-3 flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>Issued: {cert.date}</span>
                          <span>Expires: {cert.expires}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;