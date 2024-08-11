package modal;

import java.text.SimpleDateFormat;
import java.util.Date;

public class Categories {
    private int categoryId;
    private String categoryName;
    private Date createAt;

    public Categories(int categoryId, String categoryName, Date createAt) {
        this.categoryId = categoryId;
        this.categoryName = categoryName;
        this.createAt = createAt;
    }

    public int getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(int categoryId) {
        this.categoryId = categoryId;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Date getCreateAt() {
        return createAt;
    }

    public void setCreateAt(Date createAt) {
        this.createAt = createAt;
    }

    @Override
    public String toString() {
        return "Categories{" +
                "categoryId=" + categoryId +
                ", categoryName='" + categoryName + '\'' +
                ", createAt=" + createAt +
                '}';
    }
}