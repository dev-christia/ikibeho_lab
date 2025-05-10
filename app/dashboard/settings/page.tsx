"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    courseUpdates: true,
    messageNotifications: true,
    marketingEmails: false,
    darkMode: false,
  });

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings((prev) => ({
      ...prev,
      [setting]: !prev[setting],
    }));
  };

  const handleSave = () => {
    // In a real app, you would save these settings to your API
    toast.success("Settings saved successfully");
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Settings</h1>
        <p className="text-gray-500">Manage your account preferences</p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>
              Configure how you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="emailNotifications" className="font-medium">
                  Email Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Receive notifications via email
                </p>
              </div>
              <Switch
                id="emailNotifications"
                checked={settings.emailNotifications}
                onCheckedChange={() => handleToggle("emailNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="courseUpdates" className="font-medium">
                  Course Updates
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified about course updates and new content
                </p>
              </div>
              <Switch
                id="courseUpdates"
                checked={settings.courseUpdates}
                onCheckedChange={() => handleToggle("courseUpdates")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="messageNotifications" className="font-medium">
                  Message Notifications
                </Label>
                <p className="text-sm text-gray-500">
                  Get notified when you receive new messages
                </p>
              </div>
              <Switch
                id="messageNotifications"
                checked={settings.messageNotifications}
                onCheckedChange={() => handleToggle("messageNotifications")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="marketingEmails" className="font-medium">
                  Marketing Emails
                </Label>
                <p className="text-sm text-gray-500">
                  Receive promotional emails and special offers
                </p>
              </div>
              <Switch
                id="marketingEmails"
                checked={settings.marketingEmails}
                onCheckedChange={() => handleToggle("marketingEmails")}
              />
            </div>
          </CardContent>
        </Card>

  

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>Manage your account settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label
                  htmlFor="deleteAccount"
                  className="font-medium text-red-500"
                >
                  Delete Account
                </Label>
                <p className="text-sm text-gray-500">
                  Permanently delete your account and all data
                </p>
              </div>
              <Button variant="destructive" size="sm">
                Delete Account
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end">
          <Button
            className="bg-pink-600 hover:bg-pink-700"
            onClick={handleSave}
          >
            Save Settings
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
