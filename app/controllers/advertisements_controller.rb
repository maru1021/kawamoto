class AdvertisementsController < ApplicationController
  before_action :authenticate_user!

  def post()
    uploaded_file = params[:pdf]

    unless uploaded_file.present?
      return render json: { error: "ファイルが選択されていません" }, status: :bad_request
    end

    # ファイルタイプ検証
    unless uploaded_file.content_type == "application/pdf"
      return render json: { error: "PDFファイルのみアップロード可能です" }, status: :bad_request
    end

    # パストラバーサル防止: basenameで安全なファイル名に
    filename = File.basename(uploaded_file.original_filename).gsub(' ', '.')

    # 拡張子検証
    unless filename.downcase.end_with?('.pdf')
      return render json: { error: "PDFファイルのみアップロード可能です" }, status: :bad_request
    end

    save_path = Rails.root.join('public', 'advertisement', filename)

    File.open(save_path, 'wb') do |file|
      file.write(uploaded_file.read)
    end

    save_path = save_path.to_s
    output_dir = Rails.root.join('public', 'advertisement', 'thumbnails').to_s

    # コマンドインジェクション防止: 配列形式でsystem()を呼び出し
    system("python", Rails.root.join("lib", "tasks", "pdf_to_image.py").to_s, save_path, output_dir)

    render json: { message: 'PDFがアップロードされました。' }, status: :ok
  end
end
