module PageParser

  def parse_page
    ScraperWorker.perform_async(self, 1)
  end

end
