# Migration `20200726111924-add-refresh-tokens`

This migration has been generated by Adriano Anschau at 7/26/2020, 11:19:24 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."RefreshTokenModel" (
"id" SERIAL,
"token" text  NOT NULL ,
"userId" text  NOT NULL ,
PRIMARY KEY ("id"))

ALTER TABLE "public"."RefreshTokenModel" ADD FOREIGN KEY ("userId")REFERENCES "public"."User"("id") ON DELETE CASCADE ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200725165216-create-user..20200726111924-add-refresh-tokens
--- datamodel.dml
+++ datamodel.dml
@@ -2,19 +2,26 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
     provider = "postgresql"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
 }
-model UserModel {
+model User {
     id          String      @id @default(uuid())
     name        String
     email       String      @unique
     password    String?
     createdAt   DateTime    @default(now())
     updatedAt   DateTime    @updatedAt
+}
+
+model RefreshTokenModel {
+    id      Int     @id @default(autoincrement())
+    token   String
+    user    User    @relation(fields: [userId], references: [id])
+    userId  String
 }
```


