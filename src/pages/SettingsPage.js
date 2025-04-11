import React, { useState } from 'react';
import { 
  UserIcon, LockClosedIcon, BellIcon, 
  GlobeAltIcon, ColorSwatchIcon, ShieldCheckIcon,
  CogIcon, CheckIcon
} from '@heroicons/react/outline';

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [profileSettings, setProfileSettings] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Full Stack Developer with a passion for creating efficient, scalable, and maintainable applications.',
    website: 'https://johndoe.dev',
    twitterHandle: '@johndoe',
    githubUsername: 'johndoe',
    linkedinProfile: 'johndoe',
  });
  
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: true,
    sessionTimeout: '30',
    notifyOnLogin: true,
  });
  
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    projectUpdates: true,
    taskReminders: true,
    newComments: true,
    weeklyDigest: false,
  });
  
  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: 'system',
    fontSize: 'medium',
    reducedMotion: false,
    colorScheme: 'blue',
  });
  
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showEmail: false,
    allowIndexing: true,
    projectsVisibility: 'public',
    codeSnippetsVisibility: 'private',
    analyticsConsent: true,
  });
  
  const [integrationsSettings, setIntegrationsSettings] = useState({
    github: true,
    gitlab: false,
    jira: false,
    googleCalendar: true,
    slack: false,
  });
  
  // Handle profile form submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the updated profile to your backend
    console.log('Updated profile settings:', profileSettings);
    // Show a success message or handle errors
  };
  
  // Handle security form submission
  const handleSecuritySubmit = (e) => {
    e.preventDefault();
    console.log('Updated security settings:', securitySettings);
  };
  
  // Handle notification settings submission
  const handleNotificationSubmit = (e) => {
    e.preventDefault();
    console.log('Updated notification settings:', notificationSettings);
  };
  
  // Handle appearance settings submission
  const handleAppearanceSubmit = (e) => {
    e.preventDefault();
    console.log('Updated appearance settings:', appearanceSettings);
  };
  
  // Handle privacy settings submission
  const handlePrivacySubmit = (e) => {
    e.preventDefault();
    console.log('Updated privacy settings:', privacySettings);
  };
  
  // Handle integrations settings submission
  const handleIntegrationsSubmit = (e) => {
    e.preventDefault();
    console.log('Updated integrations settings:', integrationsSettings);
  };
  
  // Navigation tabs configuration
  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserIcon },
    { id: 'security', name: 'Security', icon: LockClosedIcon },
    { id: 'notifications', name: 'Notifications', icon: BellIcon },
    { id: 'appearance', name: 'Appearance', icon: ColorSwatchIcon },
    { id: 'privacy', name: 'Privacy', icon: ShieldCheckIcon },
    { id: 'integrations', name: 'Integrations', icon: GlobeAltIcon },
  ];
  
  return (
    <div className="mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="py-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Settings
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
            Manage your account settings and preferences.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 mb-6 md:mb-0">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              <nav className="space-y-1 p-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full flex items-center px-3 py-2 text-sm font-medium rounded-md ${
                      activeTab === tab.id
                        ? 'bg-primary-100 text-primary-600 dark:bg-primary-900 dark:text-primary-300'
                        : 'text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <tab.icon
                      className={`h-5 w-5 mr-3 ${
                        activeTab === tab.id
                          ? 'text-primary-500 dark:text-primary-400'
                          : 'text-gray-400 dark:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
          
          {/* Settings Content */}
          <div className="flex-1 md:ml-6">
            <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
              {/* Profile Settings */}
              {activeTab === 'profile' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Profile Settings
                  </h2>
                  <form onSubmit={handleProfileSubmit}>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            className="mt-1 input"
                            value={profileSettings.name}
                            onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email
                          </label>
                          <input
                            type="email"
                            id="email"
                            className="mt-1 input"
                            value={profileSettings.email}
                            onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Bio
                        </label>
                        <textarea
                          id="bio"
                          rows="4"
                          className="mt-1 input"
                          value={profileSettings.bio}
                          onChange={(e) => setProfileSettings({ ...profileSettings, bio: e.target.value })}
                        ></textarea>
                      </div>
                      
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Website
                        </label>
                        <input
                          type="url"
                          id="website"
                          className="mt-1 input"
                          value={profileSettings.website}
                          onChange={(e) => setProfileSettings({ ...profileSettings, website: e.target.value })}
                        />
                      </div>
                      
                      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                        <div>
                          <label htmlFor="twitter" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            Twitter
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 sm:text-sm">
                              @
                            </span>
                            <input
                              type="text"
                              id="twitter"
                              className="input rounded-l-none"
                              value={profileSettings.twitterHandle.replace('@', '')}
                              onChange={(e) => setProfileSettings({ ...profileSettings, twitterHandle: `@${e.target.value}` })}
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="github" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            GitHub
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 sm:text-sm">
                              github.com/
                            </span>
                            <input
                              type="text"
                              id="github"
                              className="input rounded-l-none"
                              value={profileSettings.githubUsername}
                              onChange={(e) => setProfileSettings({ ...profileSettings, githubUsername: e.target.value })}
                            />
                          </div>
                        </div>
                        <div>
                          <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                            LinkedIn
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400 sm:text-sm">
                              linkedin.com/in/
                            </span>
                            <input
                              type="text"
                              id="linkedin"
                              className="input rounded-l-none"
                              value={profileSettings.linkedinProfile}
                              onChange={(e) => setProfileSettings({ ...profileSettings, linkedinProfile: e.target.value })}
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Security Settings */}
              {activeTab === 'security' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Security Settings
                  </h2>
                  <form onSubmit={handleSecuritySubmit}>
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                              Two-factor authentication
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={securitySettings.twoFactorEnabled}
                                onChange={() => setSecuritySettings({
                                  ...securitySettings,
                                  twoFactorEnabled: !securitySettings.twoFactorEnabled,
                                })}
                              />
                              <div className={`relative w-10 h-5 rounded-full transition-colors ${
                                securitySettings.twoFactorEnabled ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}>
                                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  securitySettings.twoFactorEnabled ? 'transform translate-x-5' : ''
                                }`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Change password
                        </h3>
                        <div className="mt-2 grid grid-cols-1 gap-4">
                          <div>
                            <label htmlFor="current-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Current password
                            </label>
                            <input
                              type="password"
                              id="current-password"
                              className="mt-1 input"
                              placeholder="Enter current password"
                            />
                          </div>
                          <div>
                            <label htmlFor="new-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              New password
                            </label>
                            <input
                              type="password"
                              id="new-password"
                              className="mt-1 input"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Confirm new password
                            </label>
                            <input
                              type="password"
                              id="confirm-password"
                              className="mt-1 input"
                              placeholder="Confirm new password"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Session settings
                        </h3>
                        <div className="mt-2 space-y-4">
                          <div>
                            <label htmlFor="session-timeout" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                              Session timeout (minutes)
                            </label>
                            <select
                              id="session-timeout"
                              className="mt-1 input"
                              value={securitySettings.sessionTimeout}
                              onChange={(e) => setSecuritySettings({
                                ...securitySettings,
                                sessionTimeout: e.target.value,
                              })}
                            >
                              <option value="15">15 minutes</option>
                              <option value="30">30 minutes</option>
                              <option value="60">1 hour</option>
                              <option value="120">2 hours</option>
                              <option value="240">4 hours</option>
                            </select>
                          </div>
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              id="notify-login"
                              className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                              checked={securitySettings.notifyOnLogin}
                              onChange={() => setSecuritySettings({
                                ...securitySettings,
                                notifyOnLogin: !securitySettings.notifyOnLogin,
                              })}
                            />
                            <label htmlFor="notify-login" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Notify me of new logins to my account
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Notification Settings */}
              {activeTab === 'notifications' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Notification Settings
                  </h2>
                  <form onSubmit={handleNotificationSubmit}>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                            Email notifications
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Receive email notifications for important updates
                          </p>
                        </div>
                        <div className="flex items-center">
                          <label className="inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={notificationSettings.emailNotifications}
                              onChange={() => setNotificationSettings({
                                ...notificationSettings,
                                emailNotifications: !notificationSettings.emailNotifications,
                              })}
                            />
                            <div className={`relative w-10 h-5 rounded-full transition-colors ${
                              notificationSettings.emailNotifications ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                            }`}>
                              <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                notificationSettings.emailNotifications ? 'transform translate-x-5' : ''
                              }`}></div>
                            </div>
                          </label>
                        </div>
                      </div>
                      
                      <div className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Notification preferences
                        </h3>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <label htmlFor="project-updates" className="text-sm text-gray-700 dark:text-gray-300">
                              Project updates
                            </label>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="project-updates"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                checked={notificationSettings.projectUpdates}
                                onChange={() => setNotificationSettings({
                                  ...notificationSettings,
                                  projectUpdates: !notificationSettings.projectUpdates,
                                })}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="task-reminders" className="text-sm text-gray-700 dark:text-gray-300">
                              Task reminders
                            </label>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="task-reminders"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                checked={notificationSettings.taskReminders}
                                onChange={() => setNotificationSettings({
                                  ...notificationSettings,
                                  taskReminders: !notificationSettings.taskReminders,
                                })}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="new-comments" className="text-sm text-gray-700 dark:text-gray-300">
                              New comments
                            </label>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="new-comments"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                checked={notificationSettings.newComments}
                                onChange={() => setNotificationSettings({
                                  ...notificationSettings,
                                  newComments: !notificationSettings.newComments,
                                })}
                              />
                            </div>
                          </div>
                          <div className="flex items-center justify-between">
                            <label htmlFor="weekly-digest" className="text-sm text-gray-700 dark:text-gray-300">
                              Weekly digest
                            </label>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                id="weekly-digest"
                                className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                                checked={notificationSettings.weeklyDigest}
                                onChange={() => setNotificationSettings({
                                  ...notificationSettings,
                                  weeklyDigest: !notificationSettings.weeklyDigest,
                                })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Appearance Settings */}
              {activeTab === 'appearance' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Appearance Settings
                  </h2>
                  <form onSubmit={handleAppearanceSubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="theme" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Theme
                        </label>
                        <select
                          id="theme"
                          className="mt-1 input"
                          value={appearanceSettings.theme}
                          onChange={(e) => setAppearanceSettings({
                            ...appearanceSettings,
                            theme: e.target.value,
                          })}
                        >
                          <option value="light">Light</option>
                          <option value="dark">Dark</option>
                          <option value="system">System</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="font-size" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Font Size
                        </label>
                        <select
                          id="font-size"
                          className="mt-1 input"
                          value={appearanceSettings.fontSize}
                          onChange={(e) => setAppearanceSettings({
                            ...appearanceSettings,
                            fontSize: e.target.value,
                          })}
                        >
                          <option value="small">Small</option>
                          <option value="medium">Medium</option>
                          <option value="large">Large</option>
                        </select>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                          Color Scheme
                        </h3>
                        <div className="mt-2 grid grid-cols-4 gap-3">
                          {['blue', 'purple', 'green', 'orange', 'red', 'teal', 'pink', 'indigo'].map((color) => (
                            <div
                              key={color}
                              className={`flex items-center justify-center p-3 rounded-lg cursor-pointer border-2 ${
                                appearanceSettings.colorScheme === color
                                  ? 'border-primary-500 dark:border-primary-400'
                                  : 'border-transparent'
                              }`}
                              onClick={() => setAppearanceSettings({
                                ...appearanceSettings,
                                colorScheme: color,
                              })}
                            >
                              <div className={`w-8 h-8 rounded-full bg-${color}-500`}></div>
                              {appearanceSettings.colorScheme === color && (
                                <CheckIcon className="h-4 w-4 text-primary-500 dark:text-primary-400 absolute" aria-hidden="true" />
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="reduced-motion"
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                          checked={appearanceSettings.reducedMotion}
                          onChange={() => setAppearanceSettings({
                            ...appearanceSettings,
                            reducedMotion: !appearanceSettings.reducedMotion,
                          })}
                        />
                        <label htmlFor="reduced-motion" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                          Reduce motion (fewer animations)
                        </label>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Privacy Settings */}
              {activeTab === 'privacy' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Privacy Settings
                  </h2>
                  <form onSubmit={handlePrivacySubmit}>
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="profile-visibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Profile Visibility
                        </label>
                        <select
                          id="profile-visibility"
                          className="mt-1 input"
                          value={privacySettings.profileVisibility}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            profileVisibility: e.target.value,
                          })}
                        >
                          <option value="public">Public (visible to everyone)</option>
                          <option value="private">Private (only visible to you)</option>
                          <option value="contacts">Contacts Only (visible to your connections)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="projects-visibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Default Project Visibility
                        </label>
                        <select
                          id="projects-visibility"
                          className="mt-1 input"
                          value={privacySettings.projectsVisibility}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            projectsVisibility: e.target.value,
                          })}
                        >
                          <option value="public">Public (visible to everyone)</option>
                          <option value="private">Private (only visible to you)</option>
                          <option value="contacts">Contacts Only (visible to your connections)</option>
                        </select>
                      </div>
                      
                      <div>
                        <label htmlFor="code-snippets-visibility" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Default Code Snippets Visibility
                        </label>
                        <select
                          id="code-snippets-visibility"
                          className="mt-1 input"
                          value={privacySettings.codeSnippetsVisibility}
                          onChange={(e) => setPrivacySettings({
                            ...privacySettings,
                            codeSnippetsVisibility: e.target.value,
                          })}
                        >
                          <option value="public">Public (visible to everyone)</option>
                          <option value="private">Private (only visible to you)</option>
                          <option value="contacts">Contacts Only (visible to your connections)</option>
                        </select>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="show-email"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                            checked={privacySettings.showEmail}
                            onChange={() => setPrivacySettings({
                              ...privacySettings,
                              showEmail: !privacySettings.showEmail,
                            })}
                          />
                          <label htmlFor="show-email" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Show my email address on my public profile
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="allow-indexing"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                            checked={privacySettings.allowIndexing}
                            onChange={() => setPrivacySettings({
                              ...privacySettings,
                              allowIndexing: !privacySettings.allowIndexing,
                            })}
                          />
                          <label htmlFor="allow-indexing" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Allow search engines to index my public profile
                          </label>
                        </div>
                        
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            id="analytics-consent"
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded dark:bg-gray-700 dark:border-gray-600"
                            checked={privacySettings.analyticsConsent}
                            onChange={() => setPrivacySettings({
                              ...privacySettings,
                              analyticsConsent: !privacySettings.analyticsConsent,
                            })}
                          />
                          <label htmlFor="analytics-consent" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                            Allow usage data collection to improve the service
                          </label>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
              
              {/* Integrations Settings */}
              {activeTab === 'integrations' && (
                <div className="p-6">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Integrations Settings
                  </h2>
                  <form onSubmit={handleIntegrationsSubmit}>
                    <div className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-8 w-8 text-gray-900 dark:text-white"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                GitHub
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Connect your GitHub account to import and sync repositories
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={integrationsSettings.github}
                                onChange={() => setIntegrationsSettings({
                                  ...integrationsSettings,
                                  github: !integrationsSettings.github,
                                })}
                              />
                              <div className={`relative w-10 h-5 rounded-full transition-colors ${
                                integrationsSettings.github ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}>
                                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  integrationsSettings.github ? 'transform translate-x-5' : ''
                                }`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-8 w-8 text-gray-900 dark:text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M22.65 14.39L12 22.13 1.35 14.39a.84.84 0 0 1-.3-.94l1.22-3.78 2.44-7.51A.42.42 0 0 1 4.82 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.49h8.1l2.44-7.51A.42.42 0 0 1 18.6 2a.43.43 0 0 1 .58 0 .42.42 0 0 1 .11.18l2.44 7.51L23 13.45a.84.84 0 0 1-.35.94z"></path>
                            </svg>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                GitLab
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Connect your GitLab account to import and sync repositories
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={integrationsSettings.gitlab}
                                onChange={() => setIntegrationsSettings({
                                  ...integrationsSettings,
                                  gitlab: !integrationsSettings.gitlab,
                                })}
                              />
                              <div className={`relative w-10 h-5 rounded-full transition-colors ${
                                integrationsSettings.gitlab ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}>
                                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  integrationsSettings.gitlab ? 'transform translate-x-5' : ''
                                }`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-8 w-8 text-gray-900 dark:text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M12.005 0C5.375 0 0 5.375 0 12.005c0 6.63 5.375 12.005 12.005 12.005 6.63 0 12.005-5.375 12.005-12.005C24.01 5.375 18.635 0 12.005 0zm4.845 16.85l-.675.675c-.115.115-.27.172-.42.172-.155 0-.305-.057-.425-.172l-3.325-3.325-3.325 3.325c-.115.115-.27.172-.425.172-.15 0-.305-.057-.42-.172l-.675-.675c-.115-.115-.172-.27-.172-.425 0-.15.057-.305.172-.42l3.325-3.325-3.325-3.325c-.115-.115-.172-.27-.172-.42 0-.155.057-.31.172-.425l.675-.675c.115-.115.27-.172.42-.172.155 0 .31.057.425.172l3.325 3.325 3.325-3.325c.115-.115.27-.172.425-.172.15 0 .305.057.42.172l.675.675c.115.115.172.27.172.425 0 .15-.057.305-.172.42l-3.325 3.325 3.325 3.325c.115.115.172.27.172.42 0 .155-.057.31-.172.425z"></path>
                            </svg>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                Jira
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Connect to Jira to import issues and track projects
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={integrationsSettings.jira}
                                onChange={() => setIntegrationsSettings({
                                  ...integrationsSettings,
                                  jira: !integrationsSettings.jira,
                                })}
                              />
                              <div className={`relative w-10 h-5 rounded-full transition-colors ${
                                integrationsSettings.jira ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}>
                                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  integrationsSettings.jira ? 'transform translate-x-5' : ''
                                }`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-8 w-8 text-gray-900 dark:text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M20.571 12c0-4.731-3.839-8.571-8.571-8.571S3.429 7.269 3.429 12 7.268 20.571 12 20.571 20.571 16.731 20.571 12zM12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm-6.286 19.714L18 7.43 19.714 12 15.429 16.286 12 19.714 5.714 19.714z"></path>
                            </svg>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                Google Calendar
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Sync events with your Google Calendar
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={integrationsSettings.googleCalendar}
                                onChange={() => setIntegrationsSettings({
                                  ...integrationsSettings,
                                  googleCalendar: !integrationsSettings.googleCalendar,
                                })}
                              />
                              <div className={`relative w-10 h-5 rounded-full transition-colors ${
                                integrationsSettings.googleCalendar ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}>
                                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  integrationsSettings.googleCalendar ? 'transform translate-x-5' : ''
                                }`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <svg
                              className="h-8 w-8 text-gray-900 dark:text-white"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden="true"
                            >
                              <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313zM8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521h-6.312a2.528 2.528 0 0 1-2.522-2.521 2.528 2.528 0 0 1 2.522-2.521h6.312zM18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312zM15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"></path>
                            </svg>
                            <div className="ml-3">
                              <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                Slack
                              </h3>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Receive notifications in your Slack workspace
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <label className="inline-flex items-center cursor-pointer">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={integrationsSettings.slack}
                                onChange={() => setIntegrationsSettings({
                                  ...integrationsSettings,
                                  slack: !integrationsSettings.slack,
                                })}
                              />
                              <div className={`relative w-10 h-5 rounded-full transition-colors ${
                                integrationsSettings.slack ? 'bg-primary-600' : 'bg-gray-300 dark:bg-gray-600'
                              }`}>
                                <div className={`absolute left-0.5 top-0.5 bg-white w-4 h-4 rounded-full transition-transform ${
                                  integrationsSettings.slack ? 'transform translate-x-5' : ''
                                }`}></div>
                              </div>
                            </label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          className="btn btn-primary"
                        >
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;