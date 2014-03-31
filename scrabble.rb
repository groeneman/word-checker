require 'sinatra'
require 'json'
require './word_list'
require 'debugger'
require 'net/http'
require 'xmlsimple'

set :static, true

WORD_LIST = WordList.new('TWL06.txt')
MW_API_PATH = 'http://www.dictionaryapi.com/api/v1/references/collegiate/xml'

get '/words/:string_to_check' do
  string_to_check = params[:string_to_check]
  is_a_word = WORD_LIST.is_a_word? string_to_check
  return JSON.dump(string_checked: string_to_check, is_a_word: is_a_word)
end

get '/definitions/:word' do
  word = params[:word]
  url = URI.parse("#{MW_API_PATH}/#{word}?key=#{MW_API_KEY}")

  http_result = Net::HTTP.get(url)
  result = XmlSimple.xml_in(http_result, { 'KeyAttr' => 'name' })
  
  return JSON.dump(result)
end