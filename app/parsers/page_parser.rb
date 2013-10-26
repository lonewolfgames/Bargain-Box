require 'mechanize'

class PageParser
  DOMAINS = {
    "amazon" => AmazonParser,
    "ebay" => EbayParser
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
      klass = DOMAINS[ extract_domain(@item.host) ]
      raise StandardError, "Unknown domain" if klass.nil?
      if block_given?
        yield klass
      end
    end

    def extract_domain(host)
      host = host[0, host.rindex('.')]
      host = host[host.rindex('.')+1,host.length] if host.index('.')
      host
    end
end