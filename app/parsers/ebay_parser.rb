class EbayParser
  def self.get_product_title(page)
    page.search('#itemTitle').text
  end

  def self.get_image_url(page)
    value = page.search('#icImg').attribute('src').value
  end

  def self.get_base_price(page)
    price_text = page.search('#prcIsum').text
  end
end