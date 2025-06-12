"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, BookOpen, Award, ArrowRight } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  description: string;
  content: string;
  videoUrl?: string;
  completed: boolean;
}

interface Quiz {
  id: string;
  lessonId: string;
  title: string;
  questions: {
    id: string;
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  completed: boolean;
}

export default function LearningModuleClient() {
  const [activeTab, setActiveTab] = useState("lessons");
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const [activeQuizId, setActiveQuizId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, number>
  >({});
  const [quizResults, setQuizResults] = useState<{
    correct: number;
    total: number;
    passed: boolean;
  } | null>(null);

  // Sample lessons data
  const [lessons, setLessons] = useState<Lesson[]>([
    {
      id: "lesson-1",
      title: "Introduction to Entrepreneurship",
      description:
        "Learn the basics of entrepreneurship and what it means to be an entrepreneur.",
      content: `<h2>What is Entrepreneurship?</h2>
      <p>Entrepreneurship is the process of creating or starting a new business to make a profit or create social change.</p>
      <p>Entrepreneurs identify opportunities, gather resources, and build businesses to meet needs in the market.</p>
      <h2>Key Entrepreneurial Skills</h2>
      <ul>
        <li>Problem-solving</li>
        <li>Creativity</li>
        <li>Persistence</li>
        <li>Communication</li>
        <li>Financial literacy</li>
      </ul>
      <h2>Famous Young Entrepreneurs</h2>
      <p>Many successful entrepreneurs started young! For example, Mikaila Ulmer founded Me & the Bees Lemonade when she was just 4 years old.</p>`,
      videoUrl: "https://www.youtube.com/embed/Ihs4VFZWwn4",
      completed: false,
    },
    {
      id: "lesson-2",
      title: "Business Planning Basics",
      description:
        "Learn how to create a simple business plan for your first venture.",
      content: `<h2>What is a Business Plan?</h2>
      <p>A business plan is a document that describes your business idea and how you plan to make it successful.</p>
      <h2>Parts of a Simple Business Plan</h2>
      <ol>
        <li><strong>Business Name and Description</strong>: What will you call your business and what will it do?</li>
        <li><strong>Products or Services</strong>: What will you sell or what service will you provide?</li>
        <li><strong>Customer</strong>: Who will buy your product or service?</li>
        <li><strong>Pricing</strong>: How much will you charge?</li>
        <li><strong>Costs</strong>: How much will it cost to make your product or provide your service?</li>
        <li><strong>Marketing</strong>: How will people find out about your business?</li>
      </ol>
      <p>A good business plan helps you think through all the important parts of your business before you start!</p>`,
      videoUrl: "https://www.youtube.com/embed/Fqch5OrUPvA",
      completed: false,
    },
    {
      id: "lesson-3",
      title: "Marketing Your Business",
      description:
        "Learn how to tell people about your business and attract customers.",
      content: `<h2>What is Marketing?</h2>
      <p>Marketing is how you tell people about your business and convince them to buy your products or services.</p>
      <h2>The 4 P's of Marketing</h2>
      <ul>
        <li><strong>Product</strong>: What you're selling</li>
        <li><strong>Price</strong>: How much it costs</li>
        <li><strong>Place</strong>: Where people can buy it</li>
        <li><strong>Promotion</strong>: How you tell people about it</li>
      </ul>
      <h2>Marketing Ideas for Kid Entrepreneurs</h2>
      <ul>
        <li>Make colorful posters and flyers</li>
        <li>Tell friends and family about your business</li>
        <li>Create a simple logo</li>
        <li>Offer special deals for first-time customers</li>
        <li>Create business cards</li>
      </ul>`,
      videoUrl: "https://www.youtube.com/embed/ZMnCClYKUc8",
      completed: false,
    },
  ]);

  // Sample quizzes data
  const [quizzes, setQuizzes] = useState<Quiz[]>([
    {
      id: "quiz-1",
      lessonId: "lesson-1",
      title: "Introduction to Entrepreneurship Quiz",
      questions: [
        {
          id: "q1-1",
          question: "What is entrepreneurship?",
          options: [
            "Working for a big company",
            "Creating or starting a new business",
            "Selling only online",
            "Managing other people",
          ],
          correctAnswer: 1,
        },
        {
          id: "q1-2",
          question: "Which of these is an entrepreneurial skill?",
          options: [
            "Being tall",
            "Having lots of money",
            "Problem-solving",
            "Being an adult",
          ],
          correctAnswer: 2,
        },
        {
          id: "q1-3",
          question:
            "How old was Mikaila Ulmer when she started her lemonade business?",
          options: [
            "4 years old",
            "10 years old",
            "15 years old",
            "18 years old",
          ],
          correctAnswer: 0,
        },
      ],
      completed: false,
    },
    {
      id: "quiz-2",
      lessonId: "lesson-2",
      title: "Business Planning Basics Quiz",
      questions: [
        {
          id: "q2-1",
          question: "What is a business plan?",
          options: [
            "A map of where your business is located",
            "A list of employees",
            "A document that describes your business idea and how you plan to make it successful",
            "A type of bank account",
          ],
          correctAnswer: 2,
        },
        {
          id: "q2-2",
          question: "Which of these is NOT typically part of a business plan?",
          options: [
            "Products or Services",
            "Your favorite color",
            "Pricing",
            "Marketing",
          ],
          correctAnswer: 1,
        },
        {
          id: "q2-3",
          question: "Why is a business plan important?",
          options: [
            "It's required by law",
            "It helps you think through all parts of your business before you start",
            "It guarantees your business will succeed",
            "It's only needed for big businesses",
          ],
          correctAnswer: 1,
        },
      ],
      completed: false,
    },
    {
      id: "quiz-3",
      lessonId: "lesson-3",
      title: "Marketing Your Business Quiz",
      questions: [
        {
          id: "q3-1",
          question: "What is marketing?",
          options: [
            "Selling products at a market",
            "How you tell people about your business and convince them to buy",
            "Creating a website",
            "Setting prices",
          ],
          correctAnswer: 1,
        },
        {
          id: "q3-2",
          question: "Which is NOT one of the 4 P's of Marketing?",
          options: ["Product", "Price", "Place", "People"],
          correctAnswer: 3,
        },
        {
          id: "q3-3",
          question:
            "Which of these is a good marketing idea for kid entrepreneurs?",
          options: [
            "Paying for TV commercials",
            "Hiring a marketing team",
            "Making colorful posters and flyers",
            "Keeping your business a secret",
          ],
          correctAnswer: 2,
        },
      ],
      completed: false,
    },
  ]);

  const completedLessons = lessons.filter((lesson) => lesson.completed).length;
  const completedQuizzes = quizzes.filter((quiz) => quiz.completed).length;
  const totalProgress =
    ((completedLessons + completedQuizzes) /
      (lessons.length + quizzes.length)) *
    100;

  const markLessonComplete = (lessonId: string) => {
    setLessons(
      lessons.map((lesson) =>
        lesson.id === lessonId ? { ...lesson, completed: true } : lesson,
      ),
    );
  };

  const markQuizComplete = (quizId: string, passed: boolean) => {
    if (passed) {
      setQuizzes(
        quizzes.map((quiz) =>
          quiz.id === quizId ? { ...quiz, completed: true } : quiz,
        ),
      );
    }
  };

  const handleAnswerSelect = (questionId: string, answerIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: answerIndex,
    });
  };

  const handleQuizSubmit = () => {
    const currentQuiz = quizzes.find((quiz) => quiz.id === activeQuizId);
    if (!currentQuiz) return;

    let correctAnswers = 0;
    currentQuiz.questions.forEach((question) => {
      if (selectedAnswers[question.id] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const passed = correctAnswers / currentQuiz.questions.length >= 0.7; // 70% to pass
    setQuizResults({
      correct: correctAnswers,
      total: currentQuiz.questions.length,
      passed,
    });

    if (passed) {
      markQuizComplete(currentQuiz.id, true);
    }
  };

  const resetQuiz = () => {
    setSelectedAnswers({});
    setQuizResults(null);
    setActiveQuizId(null);
  };

  const renderLessonsList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-700">
          Entrepreneurship Lessons
        </h2>
        <div className="text-sm text-gray-500">
          {completedLessons}/{lessons.length} completed
        </div>
      </div>
      <Progress
        value={(completedLessons / lessons.length) * 100}
        className="h-2"
      />

      <div className="grid gap-4 mt-6">
        {lessons.map((lesson) => (
          <Card
            key={lesson.id}
            className="p-4 cursor-pointer hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg flex items-center">
                  {lesson.completed && (
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  )}
                  {lesson.title}
                </h3>
                <p className="text-gray-500 text-sm">{lesson.description}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => setActiveLessonId(lesson.id)}
                className="shrink-0"
              >
                {lesson.completed ? "Review" : "Start"}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderQuizzesList = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-orange-700">
          Knowledge Quizzes
        </h2>
        <div className="text-sm text-gray-500">
          {completedQuizzes}/{quizzes.length} completed
        </div>
      </div>
      <Progress
        value={(completedQuizzes / quizzes.length) * 100}
        className="h-2"
      />

      <div className="grid gap-4 mt-6">
        {quizzes.map((quiz) => {
          const relatedLesson = lessons.find((l) => l.id === quiz.lessonId);
          const lessonCompleted = relatedLesson?.completed || false;

          return (
            <Card
              key={quiz.id}
              className="p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg flex items-center">
                    {quiz.completed && (
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    )}
                    {quiz.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    Complete the "{relatedLesson?.title}" lesson first
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setActiveQuizId(quiz.id)}
                  disabled={!lessonCompleted}
                  className="shrink-0"
                >
                  {quiz.completed ? "Retake" : "Start Quiz"}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderLesson = () => {
    const lesson = lessons.find((l) => l.id === activeLessonId);
    if (!lesson) return null;

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setActiveLessonId(null)}>
            Back to Lessons
          </Button>
          {!lesson.completed && (
            <Button
              onClick={() => markLessonComplete(lesson.id)}
              className="bg-orange-600 hover:bg-orange-700"
            >
              Mark as Complete
            </Button>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-orange-700 mb-4">
            {lesson.title}
          </h1>

          {lesson.videoUrl && (
            <div className="aspect-video mb-6">
              <iframe
                src={lesson.videoUrl}
                className="w-full h-full rounded-lg"
                allowFullScreen
                title={lesson.title}
              />
            </div>
          )}

          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: lesson.content }}
          />

          <div className="mt-8 flex justify-between items-center">
            <div>
              {lesson.completed ? (
                <div className="flex items-center text-green-600">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span>Lesson completed</span>
                </div>
              ) : (
                <div className="text-gray-500">
                  Complete this lesson to unlock the quiz
                </div>
              )}
            </div>

            {lesson.completed && (
              <Button
                onClick={() => {
                  const relatedQuiz = quizzes.find(
                    (q) => q.lessonId === lesson.id,
                  );
                  if (relatedQuiz) {
                    setActiveQuizId(relatedQuiz.id);
                    setActiveLessonId(null);
                  }
                }}
                className="bg-orange-600 hover:bg-orange-700"
              >
                Take Quiz <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderQuiz = () => {
    const quiz = quizzes.find((q) => q.id === activeQuizId);
    if (!quiz) return null;

    if (quizResults) {
      return (
        <div className="space-y-6">
          <Button variant="outline" onClick={resetQuiz}>
            Back to Quizzes
          </Button>

          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">{quiz.title} - Results</h2>

            {quizResults.passed ? (
              <div className="py-8">
                <div className="inline-flex items-center justify-center p-4 bg-green-100 rounded-full mb-4">
                  <Award className="h-16 w-16 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-green-600 mb-2">
                  Congratulations!
                </h3>
                <p className="text-lg mb-4">
                  You passed with {quizResults.correct} out of{" "}
                  {quizResults.total} correct answers!
                </p>
                <Button
                  onClick={() => setActiveTab("lessons")}
                  className="bg-orange-600 hover:bg-orange-700"
                >
                  Continue Learning
                </Button>
              </div>
            ) : (
              <div className="py-8">
                <p className="text-lg mb-6">
                  You got {quizResults.correct} out of {quizResults.total}{" "}
                  correct answers.
                  <br />
                  You need 70% to pass. Try again!
                </p>
                <Button onClick={resetQuiz}>Retry Quiz</Button>
              </div>
            )}
          </div>
        </div>
      );
    }

    const currentQuestion = quiz.questions[currentQuestionIndex];

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="outline" onClick={() => setActiveQuizId(null)}>
            Back to Quizzes
          </Button>
          <div className="text-sm font-medium">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-6">{quiz.title}</h2>

          <div className="mb-8">
            <h3 className="text-lg font-medium mb-4">
              {currentQuestion.question}
            </h3>

            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => (
                <div
                  key={idx}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${selectedAnswers[currentQuestion.id] === idx ? "bg-orange-100 border-orange-300" : "hover:bg-gray-50"}`}
                  onClick={() => handleAnswerSelect(currentQuestion.id, idx)}
                >
                  {option}
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <Button
              variant="outline"
              onClick={() =>
                setCurrentQuestionIndex(Math.max(0, currentQuestionIndex - 1))
              }
              disabled={currentQuestionIndex === 0}
            >
              Previous
            </Button>

            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <Button
                onClick={() =>
                  setCurrentQuestionIndex(currentQuestionIndex + 1)
                }
                disabled={selectedAnswers[currentQuestion.id] === undefined}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleQuizSubmit}
                className="bg-orange-600 hover:bg-orange-700"
                disabled={
                  Object.keys(selectedAnswers).length < quiz.questions.length
                }
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <div className="flex items-center space-x-2 mb-4">
          <BookOpen className="h-6 w-6 text-orange-600" />
          <h1 className="text-2xl font-bold">Learning Center</h1>
        </div>

        <div className="flex items-center space-x-4 mb-2">
          <div className="text-sm font-medium">Overall Progress</div>
          <div className="text-sm text-gray-500">
            {completedLessons + completedQuizzes}/
            {lessons.length + quizzes.length} completed
          </div>
        </div>
        <Progress value={totalProgress} className="h-2 mb-6" />

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="lessons">Lessons</TabsTrigger>
            <TabsTrigger value="quizzes">Quizzes</TabsTrigger>
          </TabsList>
          <div className="mt-6">
            <TabsContent value="lessons">
              {activeLessonId ? renderLesson() : renderLessonsList()}
            </TabsContent>
            <TabsContent value="quizzes">
              {activeQuizId ? renderQuiz() : renderQuizzesList()}
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
