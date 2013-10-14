class AmazonParser
  def self.get_product_title(page)
    page.search('#btAsinTitle span').text
  end

  def self.get_image_url(page)
    page.search('#main-image').attribute('src').value
  end

  def self.get_base_price(page)
    price_text = page.search('#actualPriceValue .priceLarge').text
    if m = /[a-zA-Z]+/.match(price_text)
      pvalue = price_text.gsub(/(#{m})?\s/, '')
    else
      pvalue = price_text.gsub(/\s/, '')
    end
  end
end