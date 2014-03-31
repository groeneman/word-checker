require 'set'

class WordList
  def read_file
    contents = File.open(@file_path).read
    @words = Set.new(contents.split)
  end
    
  def initialize f
    @file_path = f
    read_file
  end
  
  def is_a_word? word
    @words.include? word.upcase
  end
end