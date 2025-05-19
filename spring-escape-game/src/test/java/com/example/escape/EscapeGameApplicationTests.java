package com.example.escape;

import org.junit.jupiter.api.Test;
import static org.junit.jupiter.api.Assertions.*;

class EscapeGameApplicationTests {

    @Test
    void solvePuzzleReturnsTrueForCorrectAnswer() {
        EscapeGameApplication app = new EscapeGameApplication();
        java.io.ByteArrayInputStream in = new java.io.ByteArrayInputStream("3\n".getBytes());
        System.setIn(in);
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        assertTrue(appTestSolve(scanner, 2));
    }

    @Test
    void solvePuzzleReturnsFalseForWrongAnswer() {
        EscapeGameApplication app = new EscapeGameApplication();
        java.io.ByteArrayInputStream in = new java.io.ByteArrayInputStream("5\n".getBytes());
        System.setIn(in);
        java.util.Scanner scanner = new java.util.Scanner(System.in);
        assertFalse(appTestSolve(scanner, 3));
    }

    private boolean appTestSolve(java.util.Scanner scanner, int floor) {
        try {
            java.lang.reflect.Method method = EscapeGameApplication.class.getDeclaredMethod("solvePuzzle", java.util.Scanner.class, int.class);
            method.setAccessible(true);
            return (boolean) method.invoke(new EscapeGameApplication(), scanner, floor);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
