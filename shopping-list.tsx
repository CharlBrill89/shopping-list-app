"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, X } from 'lucide-react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface ShoppingItem {
  id: number
  name: string
  completed: boolean
  category: string
}

const categories = ["Produce", "Dairy", "Bakery", "Meat", "Pantry", "Other"]

export default function ShoppingList() {
  const [items, setItems] = useState<ShoppingItem[]>([])
  const [newItem, setNewItem] = useState("")
  const [newCategory, setNewCategory] = useState("Other")
  const [searchTerm, setSearchTerm] = useState("")

  const addItem = (e: React.FormEvent) => {
    e.preventDefault()
    if (newItem.trim() !== "") {
      setItems([...items, { id: Date.now(), name: newItem, completed: false, category: newCategory }])
      setNewItem("")
      setNewCategory("Other")
    }
  }

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, completed: !item.completed } : item
    ))
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const filteredAndSortedItems = items
    .filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => {
      if (a.name.toLowerCase().startsWith(searchTerm.toLowerCase())) return -1
      if (b.name.toLowerCase().startsWith(searchTerm.toLowerCase())) return 1
      return a.category.localeCompare(b.category)
    })

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Shopping List</h1>
      
      <form onSubmit={addItem} className="mb-4 space-y-2">
        <div className="flex gap-2">
          <Input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Add new item"
            className="flex-grow"
          />
          <Button type="submit">Add</Button>
        </div>
        <Select value={newCategory} onValueChange={setNewCategory}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(category => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </form>

      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search items"
          className="pl-8"
        />
      </div>

      {categories.map(category => {
        const categoryItems = filteredAndSortedItems.filter(item => item.category === category)
        if (categoryItems.length === 0) return null

        return (
          <div key={category} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{category}</h2>
            <ul className="space-y-2">
              {categoryItems.map(item => (
                <li key={item.id} className="flex items-center gap-2 p-2 bg-gray-100 rounded">
                  <Checkbox
                    id={`item-${item.id}`}
                    checked={item.completed}
                    onCheckedChange={() => toggleItem(item.id)}
                  />
                  <Label 
                    htmlFor={`item-${item.id}`} 
                    className={`flex-grow ${item.completed ? 'line-through text-gray-500' : ''}`}
                  >
                    {item.name}
                  </Label>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

