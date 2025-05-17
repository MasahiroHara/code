using Project1;
using System;
using System.IO;
using Xunit;

public class QuizHelperTests
{
    [Fact]
    public void GetLine_ReturnsExpectedLine()
    {
        var path = Path.Combine(AppContext.BaseDirectory, "..", "..", "..", "..", "..", "servive.txt");
        var line = QuizHelper.GetLine(path, 0);
        Assert.Equal("問1、タコの足は何本？", line);
    }

    [Fact]
    public void EvaluateAnswer_ReturnsCorrectMessage()
    {
        Assert.Equal("正解です", QuizHelper.EvaluateAnswer("2", "2"));
        Assert.Equal("不正解です", QuizHelper.EvaluateAnswer("1", "2"));
    }
}
