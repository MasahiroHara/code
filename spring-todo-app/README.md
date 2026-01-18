# Spring Boot TODO アプリケーション

Spring Bootで作成したタスク管理（TODO）REST APIアプリケーションです。

## 機能

- タスクの作成、取得、更新、削除（CRUD操作）
- 完了済みタスク・未完了タスクの絞り込み
- H2インメモリデータベースを使用
- RESTful API設計

## 技術スタック

- Spring Boot 3.2.5
- Spring Data JPA
- H2 Database
- Java 17
- Maven / Gradle

## プロジェクト構造

```
spring-todo-app/
├── src/
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/todo/
│   │   │       ├── TodoApplication.java         # メインアプリケーション
│   │   │       ├── model/
│   │   │       │   └── Task.java                # タスクエンティティ
│   │   │       ├── repository/
│   │   │       │   └── TaskRepository.java      # データアクセス層
│   │   │       └── controller/
│   │   │           └── TaskController.java      # REST API エンドポイント
│   │   └── resources/
│   │       └── application.properties           # 設定ファイル
│   └── test/
│       └── java/
├── build.gradle                                 # Gradle設定
└── pom.xml                                      # Maven設定
```

## API エンドポイント

### タスク一覧取得
```
GET /api/tasks
```

### 特定のタスク取得
```
GET /api/tasks/{id}
```

### 完了済みタスク取得
```
GET /api/tasks/completed
```

### 未完了タスク取得
```
GET /api/tasks/active
```

### タスク作成
```
POST /api/tasks
Content-Type: application/json

{
  "title": "タスクのタイトル",
  "description": "タスクの説明",
  "completed": false
}
```

### タスク更新
```
PUT /api/tasks/{id}
Content-Type: application/json

{
  "title": "更新後のタイトル",
  "description": "更新後の説明",
  "completed": true
}
```

### タスク削除
```
DELETE /api/tasks/{id}
```

## ビルドと実行

### Mavenを使用する場合

```bash
# ビルド
mvn clean package

# 実行
mvn spring-boot:run
```

### Gradleを使用する場合

```bash
# ビルド
./gradlew build

# 実行
./gradlew bootRun
```

## アプリケーションへのアクセス

アプリケーションが起動したら、以下のURLでアクセスできます：

- REST API: http://localhost:8080/api/tasks
- H2 コンソール: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:tododb`
  - Username: `sa`
  - Password: (空白)

## 使用例（curl）

### タスクを作成
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{"title":"Spring Bootを学ぶ","description":"チュートリアルを完了する","completed":false}'
```

### すべてのタスクを取得
```bash
curl http://localhost:8080/api/tasks
```

### タスクを完了にする
```bash
curl -X PUT http://localhost:8080/api/tasks/1 \
  -H "Content-Type: application/json" \
  -d '{"title":"Spring Bootを学ぶ","description":"チュートリアルを完了する","completed":true}'
```

### タスクを削除
```bash
curl -X DELETE http://localhost:8080/api/tasks/1
```

## データベース

このアプリケーションはH2インメモリデータベースを使用しています。アプリケーションを再起動するとデータは失われます。本番環境では、PostgreSQLやMySQLなどの永続的なデータベースに変更することをお勧めします。

## ライセンス

このプロジェクトはMITライセンスの下で公開されています。
