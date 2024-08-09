# lib/tasks/pdf_to_image.py

import sys
import pypdfium2 as pdfium
import os
from PIL import Image

def convert_pdf_to_first_image(pdf_path, output_dir):
    pdf = pdfium.PdfDocument(pdf_path)
    # 1ページ目のみをレンダリング
    page = pdf[0]
    bitmap = page.render(scale=2)  # 2倍の解像度でレンダリング
    image = Image.fromarray(bitmap.to_numpy())  # PillowのImageに変換
    image_path = os.path.join(output_dir, f"{os.path.basename(pdf_path).replace('.pdf', '')}_page_1.png")
    image.save(image_path)
    print(f"First page saved as image: {image_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python pdf_to_image.py <pdf_directory> <output_directory>")
    else:
        pdf_directory = sys.argv[1]
        output_directory = sys.argv[2]

        # 出力ディレクトリが存在しない場合は作成
        os.makedirs(output_directory, exist_ok=True)

        # 指定されたディレクトリ内のすべてのPDFファイルを処理
        for pdf_file in os.listdir(pdf_directory):
            if pdf_file.endswith('.pdf'):
                pdf_path = os.path.join(pdf_directory, pdf_file)
                convert_pdf_to_first_image(pdf_path, output_directory)
