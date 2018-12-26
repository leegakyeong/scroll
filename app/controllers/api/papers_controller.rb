module Api
  class PapersController < ApplicationController
    before_action :authenticate_user
    before_action :set_paper, only: [:show, :update, :destroy]

    # GET /papers
    def index
      @papers = Paper.all
      @papers.map{|paper|
        paper.user.name.force_encoding('utf-8')
      } # 오 여기가 복사하지 않고 원본을 바로 바꾸는구나!

      # https://stackoverflow.com/questions/17730121/include-associated-model-when-rendering-json-in-rails
      render json: @papers, include: {user: {only: :name}}
    end

    # GET /papers/1
    def show
      render json: @paper
    end

    # POST /papers
    def create
      @paper = Paper.new(paper_params)

      if @paper.save
        render json: @paper, status: :created, location: @paper
      else
        render json: @paper.errors, status: :unprocessable_entity
      end
    end

    # PATCH/PUT /papers/1
    def update
      if @paper.update(paper_params)
        render json: @paper
      else
        render json: @paper.errors, status: :unprocessable_entity
      end
    end

    # DELETE /papers/1
    def destroy
      @paper.destroy
    end

    private
      # Use callbacks to share common setup or constraints between actions.
      def set_paper
        @paper = Paper.find(params[:id])
      end

      # Only allow a trusted parameter "white list" through.
      def paper_params
        params.require(:paper).permit(:color, :background_color)
      end
  end
end
