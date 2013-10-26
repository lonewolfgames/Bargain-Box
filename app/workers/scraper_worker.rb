class ScraperWorker
  include Sidekiq::Worker
  sidekiq_options :retry => 6

  def perform(item_id)

    item = Item.find(item_id)
    logger.info { "Item: #{item.id}" }
    pp = PageParser.new(item)
    pp.parse!
    logger.info { "Parsed!" }
  end

end
