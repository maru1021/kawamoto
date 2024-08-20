class Noti < ApplicationRecord
  has_one_attached :image

  validates :title, presence: true
  validates :article, presence: true
end
