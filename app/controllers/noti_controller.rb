class NotiController < ApplicationController
  before_action :authenticate_user!, except: [:get]

  def regist()
    noti = Noti.create(title: params['title'], article: params['article'])
    if params[:image].present?
      noti.image.attach(params[:image])
    end

    notis = Noti.all.order('id desc').map do |noti|
      {
        id: noti.id,
        title: noti.title,
        article: noti.article,
        image_url: noti.image.attached? ? url_for(noti.image) : nil # 画像が存在する場合にURLをセット
      }
    end
    render json: notis, status: :ok
  end

  def get()
    noti = Noti.find(params[:id])
    noti = {
        id: noti.id,
        title: noti.title,
        article: noti.article,
      }
    render json: noti
  end

  def edit()
    noti = Noti.find(params[:id])
    if noti.update(title: params[:title], article: params[:article])
      if params[:image].present?
        noti.image.attach(params[:image])
      end

      noti = {
        title: noti.title,
        article: noti.article,
        image_url: noti.image.attached? ? url_for(noti.image) : nil
      }
      render json: { message: "情報が更新されました", noti: noti }, status: :ok
    else
      render json: { error: "更新に失敗しました", errors: noti.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def delete()
    noti = Noti.find(params[:id])
    if noti.destroy
      notis = Noti.all.order('id desc').map do |noti|
        {
          id: noti.id,
          title: noti.title,
          article: noti.article,
          image_url: noti.image.attached? ? url_for(noti.image) : nil
        }
      end
      render json: notis, status: :ok
    else
      render json: { error: "お知らせの削除に失敗しました" }, status: :unprocessable_entity
    end
  end
end
