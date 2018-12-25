module Api
  class MemosController < ApplicationController
    before_action :authenticate_user
    before_action :set_memo, only: [:show, :update, :destroy]

    # GET /memos
    def index
      paper_id = params[:paper_id]
      @memos = Memo.where(paper_id: paper_id).reverse

      # render json: @memos

      # @memos.map{|memo| memo.force_encoding('UTF-8')}
      @memos.map{|memo| 
        memo.attributes.each do |key, value|
          if value.is_a? String
            value.force_encoding('UTF-8') # 원래 한글의 인코딩은 ASCII-8BIT임
          end
        end
      }
      # respond_to do |format|
      #   format.json {render :json => @memos}
      # end
      render json: @memos
    end

    # GET /memos/1
    def show
      render json: @memo
    end

    # POST /memos
    def create
      @memo = Memo.new(memo_params)
      puts memo_params

      if @memo.save
        render json: @memo #, status: :created, location: @memo <- 엥 이거 주석처리하니까 잘 만들어진다..!! 대체 뭐지ㅜㅜㅜㅜ 아하 https://stackoverflow.com/questions/12084431/rails-what-is-the-location-option-for-in-the-render-method
      else
        render json: @memo.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /memos/1
    def update
      if @memo.update(memo_params)
        render json: @memo
      else
        render json: @memo.errors, status: :unprocessable_entity
      end
    end

    # DELETE /memos/1
    def destroy
      @memo.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_memo
        @memo = Memo.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def memo_params
        params.require(:memo).permit(:content, :from, :paper_id, :user_id)
      end
  end
end