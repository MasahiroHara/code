package com.example.escape;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.util.Scanner;

@SpringBootApplication
public class EscapeGameApplication implements CommandLineRunner {

    private static final int MAX_FLOOR = 100;

    public static void main(String[] args) {
        SpringApplication.run(EscapeGameApplication.class, args);
    }

    @Override
    public void run(String... args) {
        try (Scanner scanner = new Scanner(System.in)) {
            for (int floor = 1; floor <= MAX_FLOOR; floor++) {
                System.out.println(floor + "Fに到達しました。問題に答えてください。");
                if (!solvePuzzle(scanner, floor)) {
                    System.out.println("不正解です。ゲームオーバー");
                    return;
                }
                System.out.println("正解！次の階へ進みます。\n");
            }
            System.out.println("全ての階を突破しました。脱出成功！");
        }
    }

    private boolean solvePuzzle(Scanner scanner, int floor) {
        int correct = floor + 1;
        System.out.print(floor + " + 1 = ");
        String input = scanner.nextLine();
        return Integer.toString(correct).equals(input);
    }
}
