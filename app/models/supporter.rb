class Supporter < ApplicationRecord
  validates :name, presence: true
  validates :post, presence: true, format: { with: /\A(\d{3}-\d{4}|\d{7})\z/, message: "は正しい形式で入力してください" }
  validates :address, presence: true
  validates :phone, presence: true, format: { with: /\A(\d{4}-\d{2}-\d{4}|\d{3}-\d{4}-\d{4}|\d{10}|\d{11})\z/, message: "は正しい形式で入力してください" }
  validates :birth, presence: true
end
