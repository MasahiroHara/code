using System;

class EscapeGame
{
    const int MaxFloor = 100;

    static void Main(string[] args)
    {
        for (int floor = 1; floor <= MaxFloor; floor++)
        {
            Console.WriteLine($"{floor}Fに到達しました。問題に答えてください。");
            if (!SolvePuzzle(floor))
            {
                Console.WriteLine("不正解です。ゲームオーバー");
                return;
            }
            Console.WriteLine("正解！次の階へ進みます。\n");
        }

        Console.WriteLine("全ての階を突破しました。脱出成功！");
    }

    static bool SolvePuzzle(int floor)
    {
        int correct = floor + 1;
        Console.Write($"{floor} + 1 = ");
        string input = Console.ReadLine();
        return input == correct.ToString();
    }
}
