module Api::V1
  class MemosController < ApplicationController
    before_action :set_memo, only: [:show, :update, :destroy]

    # GET /memos
    def index
      paper_id = params[:paper_id]
      @memos = Memo.where(paper_id: paper_id)

      render json: @memos
    end

    # GET /memos/1
    def show
      render json: @memo
    end

    # POST /memos
    def create
      @memo = Memo.new(memo_params)

      if @memo.save
        render json: @memo, status: :created, location: @memo
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
        params.require(:memo).permit(:content, :from)
      end
  end
end