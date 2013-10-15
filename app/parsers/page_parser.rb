require 'mechanize'

class PageParser
  DOMAINS = {
    "www.amazon.es" => AmazonParser,
    "www.ebay.com" => EbayParser
  }
  attr_accessor :item, :agent, :page

  def initialize(item)
    @item = item
    @agent = Mechanize.new
  end

  def parse!
    get_url_body
    build_domain_parser do |parser|
      @item.product_title = parser.get_product_title(@page)
      @item.base_price = parser.get_base_price(@page)
      @item.image_url  = parser.get_image_url(@page)
      @item.save!
    end
    @item.complete!
  end

  protected
    # fetches the Item#url
    # assigns Item.raw_http_body to the body of the http response 
    def get_url_body
      @page = @agent.get(@item.url)
      @item.raw_http_body = @page.body
    end

    def build_domain_parser(&block)
      klass = DOMAINS[URI(@item.url).host]
      raise StandardError, "Unknown domain" if klass.nil?
      if block_given?
        yield klass
      end
    end
end