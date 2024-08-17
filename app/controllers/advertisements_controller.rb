class AdvertisementsController < ApplicationController
  protect_from_forgery with: :null_session

  def post()
    uploaded_file = params[:pdf]
    filename = uploaded_file.original_filename.gsub(' ', '.')

    save_path = Rails.root.join('public', 'advertisement', filename)

    File.open(save_path, 'wb') do |file|
      file.write(uploaded_file.read)
    end

    save_path = save_path.to_s
    output_dir = Rails.root.join('public', 'advertisement', 'thumbnails').to_s

    system("python lib/tasks/pdf_to_image.py #{save_path} #{output_dir}")

    render json: { message: 'PDFがアップロードされました。' }, status: :ok
  end
end