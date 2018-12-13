module Api
  class MemosController < ApplicationController
    # skip_before_action :verify_authenticity_token
    before_action :authenticate_user
    before_action :set_memo, only: [:show, :update, :destroy]

    # GET /memos
    def index
      paper_id = params[:paper_id]
      @memos = Memo.where(paper_id: paper_id).reverse

      render json: @memos
      # puts '--------------------------------'
      # response.set_header('Access-Control-Allow-Credentials', 'true') # https://api.rubyonrails.org/classes/ActionDispatch/Response.html#method-i-set_header
      # puts response.get_header('Access-Control-Allow-Credentials')
      # puts response.to_a
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
        # @memos = Memo.where(paper_id: memo_params[:paper_id]).reverse
        render json: @memo #, status: :created, location: @memo <- 엥 이거 주석처리하니까 잘 만들어진다..!! 대체 뭐지ㅜㅜㅜㅜ 아하 https://stackoverflow.com/questions/12084431/rails-what-is-the-location-option-for-in-the-render-method
        # response.headers['Access-Control-Allow-Credentials'] = 'true' # https://api.rubyonrails.org/classes/ActionDispatch/Response.html#method-i-set_header
        # puts response.to_a
      else
        render json: @memo.errors, status: :unprocessable_entity
      end
      # Memo.create(memo_params)
      # puts memo_params
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
        params.require(:memo).permit(:content, :from, :paper_id)
      end
  end
end