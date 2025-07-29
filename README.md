# 未病サロン診断アプリケーション

機能医学×伝統医学による体質分析診断システム

## 概要

自律神経・ホルモン・免疫系の機能医学的観点と、気血水精の伝統医学的観点から、ユーザーの体質と症状を総合的に分析し、個別化された生薬レシピと施術を推奨するWebアプリケーションです。

## 特徴

- **機能医学アプローチ**: 自律神経・ホルモン・免疫系の科学的評価
- **伝統医学の智慧**: 気血水精の流れから体質を東洋医学的に分析
- **症状パターンマトリックス**: 高精度な体質タイプ判定
- **RAGベース推奨システム**: 個別化された生薬レシピ推奨
- **多言語対応**: 日本語・英語切替機能
- **レスポンシブデザイン**: スマートフォン・PC両対応

## 技術スタック

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Icons**: Lucide React
- **Animation**: Motion (Framer Motion)
- **Deployment**: Render

## 開発環境のセットアップ

### 前提条件
- Node.js 18以上
- npm または yarn

### インストール
```bash
# リポジトリのクローン
git clone <repository-url>
cd mibyou-salon-diagnosis

# 依存関係のインストール
npm install

# 開発サーバーの起動
npm run dev
```

### 利用可能なスクリプト

```bash
# 開発サーバー起動
npm run dev

# プロダクションビルド
npm run build

# ビルド結果のプレビュー
npm run preview

# ESLintによるコードチェック
npm run lint
```

## Renderでのデプロイ

### 自動デプロイ（推奨）

1. GitHubにリポジトリをプッシュ
2. Render.comでアカウント作成/ログイン
3. "New +" → "Static Site"を選択
4. GitHubリポジトリを接続
5. 以下の設定を確認:
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
   - **Node Version**: `18`

### 手動デプロイ

```bash
# プロダクションビルド
npm run build

# distフォルダの内容をRenderに手動アップロード
```

### render.yaml設定

プロジェクトには`render.yaml`ファイルが含まれており、以下の設定が自動適用されます：

- 静的サイト配信
- SPA用のルーティング設定
- セキュリティヘッダー設定
- Node.js 18環境

## プロジェクト構造

```
src/
├── App.tsx                 # メインアプリケーション
├── main.tsx               # Reactエントリーポイント
├── components/            # Reactコンポーネント
│   ├── StartScreen.tsx    # スタート画面
│   ├── QuestionScreen.tsx # 質問画面
│   ├── ResultScreen.tsx   # 結果画面
│   ├── LanguageToggle.tsx # 言語切替
│   └── ui/               # shadcn/uiコンポーネント
└── styles/
    └── globals.css       # グローバルスタイル
```

## 診断システムの仕組み

### 1. 症状パターンマトリックス
機能医学の各分野（自律神経・ホルモン・免疫）における症状の重みを数値化：

```typescript
const symptomPatternMatrix = {
  "気": {"自律神経": 3, "ホルモン": 1, "免疫": 3},
  "血": {"自律神経": 1, "ホルモン": 1, "免疫": 2},
  "水": {"自律神経": 3, "ホルモン": 1, "免疫": 2},
  "精": {"自律神経": 3, "ホルモン": 1, "免疫": 2}
};
```

### 2. RAGベース推奨システム
- 回答されたIDとの一致度
- 体質タイプとの適合度
- 機能医学的分析との整合性

### 3. 適合度スコアリング
各生薬レシピの推奨度を数値化し、優先順位付けを実施

## カスタマイズ

### 質問の追加・変更
`src/App.tsx`の`questions`配列を編集

### 生薬レシピの追加
`src/App.tsx`の`herbRecipeDatabase`配列を編集

### スタイルのカスタマイズ
`src/styles/globals.css`でTailwind CSSトークンを調整

## ライセンス

このプロジェクトは個人/商用利用可能です。

## サポート

技術的な質問や改善提案がございましたら、Issues機能をご利用ください。# fu2
