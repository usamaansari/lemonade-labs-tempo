"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  BookOpen,
  Palette,
  FileText,
  PiggyBank,
  TrendingUp,
  Calendar,
  CheckCircle,
} from "lucide-react";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: Date;
  category: string;
}

interface Milestone {
  id: string;
  name: string;
  description: string;
  completed: boolean;
  date?: Date;
}

interface Skill {
  id: string;
  name: string;
  progress: number;
  level: number;
  category: string;
}

export default function ProgressTrackerClient() {
  const [activeTab, setActiveTab] = useState("achievements");

  const [achievements, setAchievements] = useState<Achievement[]>([
    {
      id: "a1",
      name: "First Website",
      description: "Created your first website",
      icon: "FileText",
      dateEarned: new Date(2023, 4, 15),
      category: "website",
    },
    {
      id: "a2",
      name: "Logo Designer",
      description: "Created your first logo",
      icon: "Palette",
      dateEarned: new Date(2023, 4, 20),
      category: "design",
    },
    {
      id: "a3",
      name: "Marketing Pro",
      description: "Created 3 different posters",
      icon: "FileText",
      dateEarned: new Date(2023, 5, 5),
      category: "marketing",
    },
    {
      id: "a4",
      name: "Money Manager",
      description: "Saved $50 in your digital piggy bank",
      icon: "PiggyBank",
      dateEarned: new Date(2023, 5, 10),
      category: "finance",
    },
    {
      id: "a5",
      name: "Business Scholar",
      description: "Completed all entrepreneurship lessons",
      icon: "BookOpen",
      dateEarned: new Date(2023, 5, 15),
      category: "learning",
    },
  ]);

  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: "m1",
      name: "Create Business Plan",
      description: "Draft your first business plan",
      completed: true,
      date: new Date(2023, 4, 10),
    },
    {
      id: "m2",
      name: "Design Business Logo",
      description: "Create a logo for your business",
      completed: true,
      date: new Date(2023, 4, 20),
    },
    {
      id: "m3",
      name: "Build Business Website",
      description: "Create a website for your business",
      completed: true,
      date: new Date(2023, 5, 5),
    },
    {
      id: "m4",
      name: "Create Marketing Materials",
      description: "Design posters and flyers",
      completed: true,
      date: new Date(2023, 5, 15),
    },
    {
      id: "m5",
      name: "Set Savings Goal",
      description: "Create a financial goal for your business",
      completed: false,
    },
    {
      id: "m6",
      name: "Complete All Lessons",
      description: "Finish all entrepreneurship lessons",
      completed: false,
    },
  ]);

  const [skills, setSkills] = useState<Skill[]>([
    {
      id: "s1",
      name: "Website Design",
      progress: 70,
      level: 2,
      category: "design",
    },
    {
      id: "s2",
      name: "Logo Creation",
      progress: 85,
      level: 3,
      category: "design",
    },
    {
      id: "s3",
      name: "Marketing",
      progress: 60,
      level: 2,
      category: "business",
    },
    {
      id: "s4",
      name: "Financial Management",
      progress: 40,
      level: 1,
      category: "finance",
    },
    {
      id: "s5",
      name: "Business Planning",
      progress: 50,
      level: 2,
      category: "business",
    },
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const getSkillLevelName = (level: number) => {
    switch (level) {
      case 1:
        return "Beginner";
      case 2:
        return "Intermediate";
      case 3:
        return "Advanced";
      case 4:
        return "Expert";
      default:
        return "Novice";
    }
  };

  const getIconComponent = (iconName: string) => {
    switch (iconName) {
      case "FileText":
        return <FileText className="h-6 w-6" />;
      case "Palette":
        return <Palette className="h-6 w-6" />;
      case "BookOpen":
        return <BookOpen className="h-6 w-6" />;
      case "PiggyBank":
        return <PiggyBank className="h-6 w-6" />;
      default:
        return <Award className="h-6 w-6" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "website":
        return "bg-blue-100 text-blue-800";
      case "design":
        return "bg-purple-100 text-purple-800";
      case "marketing":
        return "bg-green-100 text-green-800";
      case "finance":
        return "bg-yellow-100 text-yellow-800";
      case "learning":
        return "bg-red-100 text-red-800";
      case "business":
        return "bg-indigo-100 text-indigo-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const completedMilestones = milestones.filter((m) => m.completed).length;
  const totalMilestones = milestones.length;
  const milestoneProgress = (completedMilestones / totalMilestones) * 100;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Award className="h-5 w-5 mr-2 text-indigo-600" />
              Achievements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievements.length}</div>
            <p className="text-sm text-gray-500">Badges earned</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-indigo-600" />
              Skills
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{skills.length}</div>
            <p className="text-sm text-gray-500">Skills developing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="h-5 w-5 mr-2 text-indigo-600" />
              Milestones
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between items-center mb-1">
              <div className="text-3xl font-bold">
                {completedMilestones}/{totalMilestones}
              </div>
              <div className="text-sm font-medium">
                {Math.round(milestoneProgress)}%
              </div>
            </div>
            <Progress value={milestoneProgress} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Your Entrepreneurship Journey</CardTitle>
          <CardDescription>
            Track your progress and see how far you've come
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 w-full">
              <TabsTrigger value="achievements">Achievements</TabsTrigger>
              <TabsTrigger value="milestones">Milestones</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
            </TabsList>

            <TabsContent value="achievements" className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <Card key={achievement.id} className="overflow-hidden">
                    <div className="flex p-4">
                      <div
                        className={`rounded-full p-3 mr-4 ${getCategoryColor(achievement.category)}`}
                      >
                        {getIconComponent(achievement.icon)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{achievement.name}</h3>
                        <p className="text-sm text-gray-500">
                          {achievement.description}
                        </p>
                        <div className="flex items-center mt-2">
                          <Badge
                            variant="outline"
                            className={getCategoryColor(achievement.category)}
                          >
                            {achievement.category.charAt(0).toUpperCase() +
                              achievement.category.slice(1)}
                          </Badge>
                          <span className="text-xs text-gray-500 ml-2">
                            Earned on {formatDate(achievement.dateEarned)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="milestones" className="mt-4">
              <div className="space-y-4">
                {milestones.map((milestone, index) => (
                  <div key={milestone.id} className="relative pl-8 pb-8">
                    {/* Timeline connector */}
                    {index < milestones.length - 1 && (
                      <div className="absolute left-3.5 top-3 h-full w-0.5 bg-gray-200"></div>
                    )}

                    {/* Milestone marker */}
                    <div
                      className={`absolute left-0 top-0 rounded-full p-1.5 ${milestone.completed ? "bg-green-500" : "bg-gray-300"}`}
                    >
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>

                    <Card>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-lg">
                            {milestone.name}
                          </CardTitle>
                          {milestone.completed ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                              Completed
                            </Badge>
                          ) : (
                            <Badge variant="outline">In Progress</Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-gray-600">{milestone.description}</p>
                        {milestone.date && (
                          <p className="text-sm text-gray-500 mt-2">
                            {milestone.completed
                              ? "Completed on"
                              : "Target date"}
                            : {formatDate(milestone.date)}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="skills" className="mt-4">
              <div className="space-y-6">
                {skills.map((skill) => (
                  <div key={skill.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{skill.name}</h3>
                        <div className="flex items-center">
                          <Badge className={getCategoryColor(skill.category)}>
                            {skill.category.charAt(0).toUpperCase() +
                              skill.category.slice(1)}
                          </Badge>
                          <span className="text-xs ml-2">
                            Level {skill.level}:{" "}
                            {getSkillLevelName(skill.level)}
                          </span>
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {skill.progress}%
                      </div>
                    </div>
                    <Progress value={skill.progress} className="h-2" />

                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Current Level</span>
                      <span>Next Level</span>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
