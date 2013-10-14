class ScraperWorker
  include Sidekiq::Worker

  def perform(item_id)
    item = Item.find(item_id)
    puts item.inspect
  end

end
