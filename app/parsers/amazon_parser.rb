class AmazonParser
  def self.get_product_title(page)
    page.search('#btAsinTitle span').text
  end

  def self.get_image_url(page)
    page.search('#prodImageCell img').attribute('src').value
  end

  def self.get_base_price(page)
    price_text = page.search('#actualPriceValue .priceLarge').text
    Money.parse(price_text).cents
  end
end