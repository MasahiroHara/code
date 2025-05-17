using System;
using System.IO;
using System.Linq;

namespace Project1
{
    public static class QuizHelper
    {
        public static string GetLine(string path, int lineNumber)
        {
            return File.ReadLines(path).Skip(lineNumber).First();
        }

        public static string EvaluateAnswer(string input, string correct)
        {
            return input == correct ? "正解です" : "不正解です";
        }
    }
}
