using System;
using System.IO;
using System.Linq;



    class quiz
    {
        static void Main(string[] args)
        {
            int n = 0;
            string line = File.ReadLines(@"C:\quiz.txt").Skip(n).First();
            Console.WriteLine(line);

            string[] str = {"1: 1  2:  2  3:  8"};
            foreach (var a in str)
            {
                Console.WriteLine(a);
            }


            var ben = Console.ReadLine();

     
            if (ben == "3")
            {
                Console.WriteLine("正解です");
            }
            else
            {
                Console.WriteLine("不正解です");
            }

            n = 1;
            line = File.ReadLines(@"C:\quiz.txt").Skip(n).First();
            Console.WriteLine(line);

            string[] str2 = {"1:  34  2:  47  3:  60  4:  20"};
            foreach (var a in str2)
            {
                Console.WriteLine(a);
            }

            ben= Console.ReadLine();


            if (ben == "2")
            {
                Console.WriteLine("正解です");
            }

            else 
            {
                Console.WriteLine("不正解です");
            }


            n = 2;
            line = File.ReadLines(@"C:\quiz.txt").Skip(n).First();
            Console.WriteLine(line);

            string[] str3 = { "1: 3776 2: 2480 3: 4500" };
            foreach (var a in str3)
            {
                Console.WriteLine(a);
            }

            ben = Console.ReadLine();


            if (ben == "1")
            {
                Console.WriteLine("正解です");
            }

            else
            {
                Console.WriteLine("不正解です");
            }


            n = 3;
            line = File.ReadLines(@"C:\quiz.txt").Skip(n).First();
            Console.WriteLine(line);

            string[] str4 = { "1: 色に効果があるから 2: カフェインが入っているから 3: 苦いから" };
            foreach (var a in str4)
            {
                Console.WriteLine(a);
            }

            ben = Console.ReadLine();


            if (ben == "2")
            {
                Console.WriteLine("正解です");
            }   

            else
            {
                Console.WriteLine("不正解です");
            }

            n = 4;
            line = File.ReadLines(@"C:\quiz.txt").Skip(n).First();
            Console.WriteLine(line);

            string[] str5 = { "1:最後の晩餐  2: モナ・リザ 3: 人生" };
            foreach (var a in str5)
            {
                Console.WriteLine(a);
            }

            ben = Console.ReadLine();


            if (ben == "3")
            {
            Console.WriteLine("正解です");
            }

            else
            {
            Console.WriteLine("不正解です");
            }
    }
       
        


}


    

        













