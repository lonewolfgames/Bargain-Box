class ScraperWorker
  include Sidekiq::Worker
  sidekiq_options :retry => false

  def perform(item_id)
    item = Item.find(item_id)
    pp = PageParser.new(item)
    pp.parse!
  end

end
