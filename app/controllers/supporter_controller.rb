class SupporterController < ApplicationController
  def get()
    supporter = Supporter.find(params[:id])
    render json: supporter
  end

  def post()
    phone = params[:phone]
    if phone.length == 10
      phone = params[:phone].gsub(/(\d{4})(\d{2})(\d{4})/, '\1-\2-\3')
    elsif phone.length == 11
      phone = phone.gsub(/(\d{3})(\d{4})(\d{4})/, '\1-\2-\3')
    end

    post = params[:post]
    if post.length == 7
      post = post.gsub(/(\d{3})(\d{4})/, '\1-\2')
    end

    supporter = Supporter.find(params[:id])
    if supporter.update(
      name: params[:name],
      post: post,
      address: params[:address],
      phone: phone,
      birth: params[:birth]
    )
      render json: { message: "情報が更新されました", supporter: supporter }, status: :ok
    else
      render json: { error: "更新に失敗しました", errors: supporter.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def delete
    supporter = Supporter.find(params[:id])
    if supporter.destroy
      render json: { message: "サポーターが削除されました" }, status: :ok
    else
      render json: { error: "サポーターの削除に失敗しました" }, status: :unprocessable_entity
    end
  end
end
