# lib/tasks/pdf_to_image.py

import sys
import pypdfium2 as pdfium
import os
from PIL import Image

def convert_pdf_to_first_image(pdf_path, output_dir):
    pdf = pdfium.PdfDocument(pdf_path)

    page = pdf[0]
    bitmap = page.render(scale=2)
    image = Image.fromarray(bitmap.to_numpy())
    image_path = os.path.join(output_dir, f"{os.path.basename(pdf_path).replace('.pdf', '')}_page_1.png")
    image.save(image_path)
    print(f"First page saved as image: {image_path}")

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python pdf_to_image.py <pdf_directory> <output_directory>")
    else:
        pdf_path = sys.argv[1]
        output_directory = sys.argv[2]

        os.makedirs(output_directory, exist_ok=True)

        convert_pdf_to_first_image(pdf_path, output_directory)
