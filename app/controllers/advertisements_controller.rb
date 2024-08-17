class AdvertisementsController < ApplicationController
  protect_from_forgery with: :null_session

  def post()
    uploaded_file = params[:pdf]

    save_path = Rails.root.join('public', 'advertisement', uploaded_file.original_filename)

    File.open(save_path, 'wb') do |file|
      file.write(uploaded_file.read)
    end

    input_dir = Rails.root.join('public', 'advertisement').to_s
    output_dir = Rails.root.join('public', 'advertisement', 'thumbnails').to_s

    system("python lib/tasks/pdf_to_image.py #{save_path} #{output_dir}")

    render json: { message: 'PDFがアップロードされました。' }, status: :ok
  end
end