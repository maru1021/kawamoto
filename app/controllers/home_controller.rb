class HomeController < ApplicationController
  def index
    # PDFファイルのサムネイル画像のパスを取得
    @pdf_thumbnails = Dir.glob(Rails.root.join('public', 'advertisement', 'thumbnails', '*_page_1.png'))
  end
end
