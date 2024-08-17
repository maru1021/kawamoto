class Supporter < ApplicationRecord
  validates :name, presence: true
  validates :post, presence: true
  validates :address, presence: true
  validates :phone, presence: true
  validates :birth, presence: true
end
